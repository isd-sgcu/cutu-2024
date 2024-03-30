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
  implements GameHistoryAttributes { }

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
      const totalVote = await this.redis.mGet(keys).then((votes) =>
        votes.reduce((acc, v) => acc + parseInt(v || '0'), 0),
      ) || 1
      keys.forEach(async (k) => {
        if (k !== `game::${game_id}::${key}`) {
          const kTotal = parseInt(await this.redis.get(k) || '0')
          const decrease = ((Math.floor((total - kTotal) * vote / totalVote)))
          const remain = kTotal - decrease
          if (remain > 0) this.redis.decrBy(k, decrease)
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
        return this.redis.set('state::game', id)
      })
      .then(() => 'OK')
      .catch((err) => {
        this.logger.error(err)
        throw new Error("Can't set game redis keys")
      })
  }

  async getLastActiveGame() {
    return await this.redis.get('state::game').then((game) => {
      if (game) {
        return Game.findByPk(game).then((res) => ({
          id: res?.id,
          game: res,
          status: res?.open ? 'playing' : 'waiting',
        }))
      }
      return Game.findOne({
        order: [['updatedAt', 'DESC']],
        attributes: ['id', 'open', 'actions'],
        limit: 1,
      }).then((res) => ({
        id: res?.id,
        game: res,
        status: res?.open ? 'playing' : 'waiting',
      }))
    })
  }

}
