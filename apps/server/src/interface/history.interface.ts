

import { Optional } from 'sequelize'

export interface GameHistoryAttributes {
  game_id: string
  player_id: string
  key: string
  vote: number
  total_vote?: number
}

export interface GameHistoryInput
  extends Optional<GameHistoryAttributes, 'vote'> { }
export interface GameHistoryOuput extends Required<GameHistoryAttributes> { }
