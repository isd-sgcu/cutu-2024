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
    await this.redis.incrBy(`game::${game_id}::${key}`, vote)
    return GameHistory.findOne({ where: { game_id, player_id, key } }).then(
      async (res) => {
        if (res) {
          return GameHistory.increment(
            { vote },
            { where: { game_id, player_id, key } },
          )
        } else {
          return GameHistory.create({ game_id, player_id, key, vote })
        }
      },
    )
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
      vote: votes[index],
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
        if (game) {
          if (reset) {
            game.actions.forEach((action) => {
              this.redis.set(`game::${id}::${action.key}`, 0)
            })
            await GameHistory.update({ vote: 0 }, { where: { game_id: id } })
          }
        }
      })
      .then(() => 'OK')
      .catch((err) => {
        this.logger.error(err)
        throw new Error("Can't set game redis keys")
      })
  }
}
