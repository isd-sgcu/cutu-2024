import { DataTypes, Model } from 'sequelize'
import {
  GameHistoryAttributes,
  GameHistoryInput,
} from '$/interface/history.interface'
import { sequelizeConnection } from '$/utils/database'
import { RedisClientType } from '@redis/client'

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
  constructor(private readonly redis: RedisClientType) { }

  getHistory(game_id: string) { }
}
