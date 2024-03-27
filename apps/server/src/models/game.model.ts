import { DataTypes, Model } from "sequelize";
import { GameAttributes, GameInput } from "../interface/game.dto";
import { sequelizeConnection } from "../utils/database";

export class Game extends Model<GameAttributes, GameInput> implements GameAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public open!: boolean;
  public actions!: { key: string; image: string; }[];
  public image!: string;
  public winner!: { key: string; image: string; };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Game.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
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
    defaultValue: true
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
    defaultValue: {}
  },
}, { timestamps: true, sequelize: sequelizeConnection, paranoid: true })

export class GameRepository {

  async getAllGames(): Promise<Game[]> {
    return Game.findAll();
  }

  async getGameById(id: string) {
    return await Game.findByPk(id)
  }

  async getState() {
    return Game.findAndCountAll({ where: { open: true } });
  }

  async createGame(game: Game) {
    return Game.create(game)
  }
}