import { Game, GameRepository } from '$/models/game.model'
import { GameHistoryRepository } from '$/models/history.model'

export class AdminService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly gameHistoryRepository: GameHistoryRepository,
  ) { }

  async getGameByID(id: string) {
    return this.gameRepository.getGameById(id).catch((error) => ({ error }))
  }

  async listGames() {
    return this.gameRepository.getAllGames()
  }

  async getGameState() {
    const games = await this.gameRepository.getLastActiveGame()
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

  async startGame(id: string, reset: boolean) {
    this.gameHistoryRepository.startGame(id, reset)
    return this.gameRepository.startGame(id)
  }

  async endGame(id: string) {
    return this.gameRepository.endGame(id)
  }

  async getGameSummary(id: string) {
    return this.gameHistoryRepository.summaryGame(id)
  }

  async setScreenState(state: 'full' | 'overlay') {
    return this.gameHistoryRepository.setScreenState(state)
  }


}
