import { DataTypes, Model, col, fn } from 'sequelize'
import { GameAttributes, GameInput } from '$/interface/game.interface'
import { sequelizeConnection } from '$/utils/database'
import { GameHistory } from './history.model'

export class Game
  extends Model<GameAttributes, GameInput>
  implements GameAttributes {
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

export class GameRepository {
  async getAllGames(): Promise<Game[]> {
    return Game.findAll()
  }

  async getGameById(id: string) {
    return await Game.findByPk(id)
  }

  async getLastActiveGame() {
    const game = await Game.findOne({
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'open'],
      limit: 1,
    }).then((res) => ({
      id: res?.id,
      status: res?.open ? 'playing' : 'waiting',
    }))
    return game
  }

  async createGame(game: Game) {
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
    return Game.findOne({ where: { open: true } }).then(async (game) => {
      await game?.update({ open: false })
      return Game.update({ open: true }, { where: { id: game_id }, returning: true }).then((res) => {
        if (!res[1][0]) {
          throw Error('Game not found')
        }
        return res[1][0]
      })
    }
    )
  }

  async calculateVotes(game_id: string) {
    const keys = Game.findOne({
      where: { id: game_id },
      attributes: ['actions'],
    }).then((res) => res?.actions.map((action: any) => action.key))
    return GameHistory.findAll({
      where: { game_id },
      attributes: ['key', [fn('sum', col('vote')), 'total_vote']],
      group: ['key'],
    }).then(async (votes) => {
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
  }

  async endGame(id: string) {
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
          return Game.update(
            { winner },
            { where: { id }, returning: true },
          )
        })
    })
  }
}
