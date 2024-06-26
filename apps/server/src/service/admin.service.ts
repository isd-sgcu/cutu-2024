import { Game, GameRepository } from '$/models/game.model'
import { GameHistoryRepository } from '$/models/history.model'

export class AdminService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly gameHistoryRepository: GameHistoryRepository,
  ) { }

  async getGameByID(id: string) {
    return this.gameRepository.getGameById(id)
  }

  async listGames() {
    return this.gameRepository.getAllGames()
  }

  async getGameState() {
    const games = await this.gameHistoryRepository.getLastActiveGame()
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

  async getScoreboard(game_id: string, game_keys: string[]) {
    return this.gameHistoryRepository
      .summaryGame(game_id, game_keys)
      .then((score) => {
        const total_vote = score.reduce((acc, s) => acc + s.vote, 0)
        if (total_vote === 0) {
          return score.map((s) => `${s.key} ${(100 / score.length).toFixed(2)}`).join(' ')
        }
        return score?.map((s) => `${s.key} ${(s.vote / total_vote * 100).toFixed(2)}`).join(' ')
      })
  }

  async endGame(id: string) {
    return this.gameRepository.endGame(id)
  }

  async getGameSummary(id: string, game_keys: string[]) {
    return this.gameHistoryRepository.summaryGame(id, game_keys)
  }

  async setScreenState(state: 'full' | 'overlay') {
    return this.gameHistoryRepository.setScreenState(state)
  }
}
