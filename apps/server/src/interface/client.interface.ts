import { Optional } from 'sequelize'

export interface ClientAttributes {
  id: string
  sid: string
  cid: string
  fid: string
  isSuspended: boolean
  ipAddr: string
  name: string
}

export interface ClientInput
  extends Optional<ClientAttributes, 'id' | 'ipAddr'> {}
export interface ClientOuput extends Required<ClientAttributes> {}
