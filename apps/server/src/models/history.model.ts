

import { DataTypes, Model } from 'sequelize'
import { GameHistoryAttributes, GameHistoryInput } from '$/interface/history.interface'
import { sequelizeConnection } from '$/utils/database'

export class GameHistory
  extends Model<GameHistoryAttributes, GameHistoryInput>
  implements GameHistoryAttributes {
  [x: string]: any
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
    }

  },
  { timestamps: true, sequelize: sequelizeConnection, paranoid: true },
)

export class GameHistoryRepository {
  async getAllGameHistorys(): Promise<GameHistory[]> {
    return GameHistory.findAll()
  }

  async getGameHistoryByGameId(game_id: string) {
    return await GameHistory.findAll({ where: { game_id } })
  }

  async createGameHistory(gameHistory: GameHistory) {
    return GameHistory.create(gameHistory)
  }
}
