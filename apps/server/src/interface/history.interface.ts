

import { Optional } from 'sequelize'

export interface GameHistoryAttributes {
  id: string
  game_id: string
  player_id: string
  action: string
  vote: number
}

export interface GameHistoryInput
  extends Optional<GameHistoryAttributes, 'id' | 'vote'> { }
export interface GameHistoryOuput extends Required<GameHistoryAttributes> { }
