

import { DataTypes, Model } from 'sequelize'
import { GameHistoryAttributes, GameHistoryInput } from '$/interface/history.interface'
import { sequelizeConnection } from '$/utils/database'
import { Game } from './game.model'
import { Client } from './client.model'

export class GameHistory
  extends Model<GameHistoryAttributes, GameHistoryInput>
  implements GameHistoryAttributes {
  public id!: string
  public game_id!: string
  public player_id!: string
  public action!: string
  public vote!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

GameHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID,
    },
    game_id: {
      type: DataTypes.UUID,
      references: {
        model: Game,
        key: 'id'
      }
    },
    player_id: {
      type: DataTypes.UUID,
      references: {
        model: Client,
        key: 'id',
      }
    },
    action: {
      type: DataTypes.STRING,
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

  async createEntry(game_id: string, player_id: string, action: string) {
    const entry = new GameHistory({ game_id, player_id, action })
  }

  async createGameHistory(gameHistory: GameHistory) {
    return GameHistory.create(gameHistory)
  }
}
