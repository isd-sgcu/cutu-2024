import { DataTypes, Model } from 'sequelize'
import {
  GameHistoryAttributes,
  GameHistoryInput,
} from '$/interface/history.interface'
import { sequelizeConnection } from '$/utils/database'
import {
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisScripts,
} from 'redis'
import { createLogger } from '$/utils/logger'
import { Game } from './game.model'

export class GameHistory
  extends Model<GameHistoryAttributes, GameHistoryInput>
  implements GameHistoryAttributes {
  public game_id!: string
  public player_id!: string
  public key!: string
  public vote!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

GameHistory.init(
  {
    game_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    player_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    vote: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, paranoid: true },
)

export class GameHistoryRepository {
  logger = createLogger('GameHistoryRepository')
  constructor(
    private readonly redis: RedisClientType<
      RedisDefaultModules,
      RedisFunctions,
      RedisScripts
    >,
  ) { }

  async createHistory(
    game_id: string,
    player_id: string,
    key: string,
    vote: number,
  ) {
    const total = await this.redis.incrBy(`game::${game_id}::${key}`, vote)
    this.redis.keys(`game::${game_id}::*`).then(async (keys) => {
      keys.forEach(async (k) => {
        if (k !== `game::${game_id}::${key}`) {
          const kTotal = parseInt((await this.redis.get(k)) || '0')
          if (kTotal > total - vote) {
            this.redis.decrBy(k, Math.round((kTotal - total + vote) * 0.1))
          }
        }
      })
    })
  }

  async getHistoryByPlayerID(game_id: string, player_id: string) {
    return GameHistory.findAll({ where: { game_id, player_id } })
  }

  async getHistoryByGameID(game_id: string) {
    return GameHistory.findAll({ where: { game_id } })
  }

  async summaryGame(game_id: string, game_keys: string[]) {
    const keys = game_keys.map((key) => `game::${game_id}::${key}`)
    const votes = await this.redis.mGet(keys)

    return keys.map((key, index) => ({
      key: key.split('::')[2],
      vote: parseInt(votes[index] || '0'),
    }))
  }

  async setScreenState(state: 'full' | 'overlay') {
    return this.redis.set('state::screen', state).catch((err) => {
      this.logger.error(err)
      throw new Error("Can't set screen state")
    })
  }

  async getScreenState() {
    return await this.redis
      .get('state::screen')
      .then((state) => state || 'full')
  }

  async startGame(id: string, reset: boolean) {
    return Game.findByPk(id)
      .then(async (game) => {
        if (game && reset) {
          game.actions.forEach((action) => {
            this.redis.set(`game::${id}::${action.key}`, 0)
          })
        }
        return this.redis
          .set('state::game', id)
          .then(() =>
            this.redis
              .set('state::status', 'playing')
              .then(
                async () =>
                  game &&
                  (await this.redis
                    .set(
                      'state::actions',
                      game.actions.map((g) => g.key).join(' '),
                    )
                    .then(() => 'OK')),
              ),
          )
      })
      .then(() => 'OK')
      .catch((err) => {
        this.logger.error(err)
        throw new Error("Can't set game redis keys")
      })
  }

  async endGame(id: string) {
    return this.redis
      .set('state::status', 'waiting')
      .then(async () =>
        this.getLastActiveGame().then((game) =>
          this.summaryGame(id, game.actions)
            .then((score) => {
              return score.reduce((acc, s) => (s.vote > acc.vote ? s : acc))
            })
            .then((winner) =>
              Game.update(
                {
                  winner: { key: winner.key, total_vote: winner.vote },
                  open: false,
                },
                { where: { id }, returning: true },
              ).then((res) => {
                if (!res[1][0]) {
                  throw Error('Game not found')
                }
                return res[1][0] as Game
              }),
            ),
        )
      )
      .catch((err) => {
        this.logger.error(err)
        throw new Error("Can't set game redis keys")
      })
  }

  async getLastActiveGame() {
    return await this.redis.get('state::game').then(async (game) => {
      return this.redis.get('state::status').then((status) =>
        this.redis.get('state::actions').then((actions) => {
          return {
            id: game,
            status: status || 'waiting',
            actions: actions ? actions.split(' ') : [],
          }
        }),
      )
    })
  }
}
