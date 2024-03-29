import { Server, Socket } from 'socket.io'
import { createLogger } from '$/utils/logger'
import { AdminService } from '$/service/admin.service'
import { Request, Response } from 'express'

export class AdminController {
  private readonly logger = createLogger('AdminController')
  constructor(
    private readonly io: Server,
    private readonly adminService: AdminService,
  ) {}
  async getGames(req: Request, res: Response) {
    const games = await this.adminService.getAllGames()
    res.json(games)
  }

  async getGame(req: Request, res: Response) {
    const game = await this.adminService.getGame(req.params.id)
    res.json(game)
  }

  async createGame(req: Request, res: Response) {
    const game = await this.adminService.createGame(req.body)
    res.json(game)
  }

  async getGameById(req: Request, res: Response) {
    const game = await this.adminService.getGame(req.params.id)
    res.json(game)
  }

  async getState(req: Request, res: Response) {
    const state = await this.adminService.getState()
    res.json(state)
  }

  async startGame(req: Request, res: Response) {
    const game = await this.adminService.startGame(req.params.id)
    res.json(game)
    this.io.emit('events', 'start')
    this.io.emit('state', await this.adminService.getState())
  }

  async endGame(req: Request, res: Response) {
    const game = await this.adminService.endGame(req.params.id)
    res.json(game)
    this.io.emit('events', 'stop')
    this.io.emit('state', await this.adminService.getState())
  }
}
