import { PlayerService } from "../service/player.service";
import { Request, Response } from 'express';

export class PlayerController {
  constructor(private readonly playerService: PlayerService) { }

  async getGames(req: Request, res: Response) {
    return this.playerService.getGame()
  }
}