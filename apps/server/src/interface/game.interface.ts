

import { Optional } from 'sequelize'

export interface GameAttributes {
  id: string
  title: string
  description: string
  open: boolean
  actions: {
    key: string
    image: string
  }[]
  image: string
  winner: { key: string; image: string }
}

export interface GameInput extends Optional<GameAttributes, 'id' | 'winner'> { }
export interface GameOuput extends Required<GameAttributes> { }

export interface CreateGameRequest
  extends Omit<GameAttributes, 'id' | 'winner'> { }
