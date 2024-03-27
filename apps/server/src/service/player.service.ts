import { GameRepository } from "../models/game.model";

export class PlayerService {
  constructor(private readonly gameRepository: GameRepository) { }

  async getGame(id: string) {
    return await this.gameRepository.getGameById(id).catch(err => ({ err }))
  }

  async getState() {
    const games = await this.gameRepository.getState();
    return games
  }
}
