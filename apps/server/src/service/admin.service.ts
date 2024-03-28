

import { Game, GameRepository } from '$/models/game.model'

export class AdminService {
  constructor(private readonly gameRepository: GameRepository) { }

  async getGame(id: string) {
    return this.gameRepository.getGameById(id).catch((error) => ({ error }))
  }

  async getAllGames() {
    return this.gameRepository.getAllGames()
  }

  async getState() {
    const games = await this.gameRepository.getState()
    return games
  }

  async createGame(game: any) {
    const gameModel = {
      title: game.title,
      description: game.description,
      open: game.open,
      actions: game.actions,
      image: game.image,
    } as Game
    return this.gameRepository.createGame(gameModel)
  }
}
