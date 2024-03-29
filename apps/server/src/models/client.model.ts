import { DataTypes, Filterable, Model, WhereOptions } from 'sequelize'
import { ClientAttributes, ClientInput } from '$/interface/client.interface'
import { sequelizeConnection } from '$/utils/database'

export class Client
  extends Model<ClientAttributes, ClientInput>
  implements ClientAttributes
{
  public id!: string
  public sid!: string
  public fid!: string
  public cid!: string
  public isSuspended!: boolean
  public ipAddr!: string
  public name!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Client.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => crypto.randomUUID(),
    },
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSuspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    ipAddr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown Person',
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, paranoid: true },
)

export class ClientRepository {
  async getAllClients(): Promise<Client[]> {
    return Client.findAll()
  }

  async getClientById(id: string) {
    return await Client.findByPk(id)
  }

  async suspendPlayer(id: string, status: boolean) {
    return Client.update({ isSuspended: status }, { where: { id } })
  }

  async createClient(client: Client) {
    return Client.create(client)
  }

  async searchPlayer(query: WhereOptions<ClientAttributes>) {
    return Client.findOne({ where: query })
  }

  async updateSID(cid: string, fid: string, sid: string) {
    return Client.update({ sid }, { where: { cid, fid }, returning: true })
  }
}
