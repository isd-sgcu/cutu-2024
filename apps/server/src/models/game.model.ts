import { DataTypes, Model, col, fn } from 'sequelize'
import { GameAttributes, GameInput } from '$/interface/game.interface'
import { sequelizeConnection } from '$/utils/database'
import { GameHistory } from './history.model'
import { RedisClientType, RedisDefaultModules, RedisFunctions, RedisScripts } from 'redis'
import { createLogger } from '$/utils/logger'

export class Game
  extends Model<GameAttributes, GameInput>
  implements GameAttributes
{
  public id!: string
  public title!: string
  public description!: string
  public open!: boolean
  public actions!: { key: string; image: string }[]
  public image!: string
  public winner!: { key: string; total_vote: number }

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Game.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => crypto.randomUUID(),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    actions: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    winner: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, paranoid: true },
)

const LAST_ACTIVE_CACHE_KEY = "db::last_active"

export class GameRepository {
  logger = createLogger('GameRepository')

  constructor(
    private readonly redis: RedisClientType<
      RedisDefaultModules,
      RedisFunctions,
      RedisScripts
    >,
  ) {}

  async getAllGames(): Promise<Game[]> {
    return Game.findAll()
  }

  async getGameById(id: string) {
    return await Game.findByPk(id)
  }

  async getLastActiveGame() {
    const cache = await this.redis.get(LAST_ACTIVE_CACHE_KEY)
    if (cache) {
      try {
        const game = JSON.parse(cache)
        return game
      } catch (e) {
        this.logger.warn(`last active cache is not JSON ${cache}`)
        await this.redis.del(LAST_ACTIVE_CACHE_KEY)
      }
    }
    const game = await Game.findOne({
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'open', 'actions'],
      limit: 1,
    }).then((res) => ({
      id: res?.id,
      game: res,
      status: res?.open ? 'playing' : 'waiting',
    }))
    await this.redis.set(LAST_ACTIVE_CACHE_KEY, JSON.stringify(game))
    return game
  }

  async createGame(game: Game) {
    await this.redis.set(`game_key::${game.id}`, game.actions.map(x => x.key).join(','))
    return Game.create(game)
  }

  async createHistory(
    game_id: string,
    player_id: string,
    key: string,
    vote: number,
  ) {
    return GameHistory.upsert(
      { game_id, player_id, key, vote },
      { conflictWhere: { game_id, player_id, key } },
    )
  }

  async startGame(game_id: string) {
    await this.redis.del(LAST_ACTIVE_CACHE_KEY)
    return Game.findOne({ where: { open: true } }).then(async (game) => {
      await game?.update({ open: false })
      return Game.update(
        { open: true },
        { where: { id: game_id }, returning: true },
      ).then((res) => {
        if (!res[1][0]) {
          throw Error('Game not found')
        }
        return res[1][0] as Game
      })
    })
  }

  async endGame(id: string) {
    await this.redis.del(LAST_ACTIVE_CACHE_KEY)
    return Game.update({ open: false }, { where: { id } }).then(() => {
      const keys = Game.findOne({
        where: { id },
        attributes: ['actions'],
      }).then((res) => res?.actions.map((action: any) => action.key))
      return GameHistory.findAll({
        where: { game_id: id },
        attributes: ['key', [fn('sum', col('vote')), 'total_vote']],
        group: ['key'],
      })
        .then(async (votes) => {
          return keys.then((keys) => {
            return keys?.map((key: string) => {
              const vote = votes.find((vote) => vote.key === key)
              return {
                key,
                total_vote: parseInt(vote?.dataValues.total_vote || '0'),
              }
            })
          })
        })
        .then((votes) => {
          const winner = votes?.reduce((prev, current) =>
            prev.total_vote > current.total_vote ? prev : current,
          )
          return Game.update({ winner }, { where: { id }, returning: true })
        })
    })
  }
}
