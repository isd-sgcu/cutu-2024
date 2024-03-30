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
  async listGames(req: Request, res: Response) {
    const games = await this.adminService.listGames()
    res.json(games)
  }

  async getGameByID(req: Request, res: Response) {
    const game = await this.adminService.getGameByID(req.params.id)
    if (!game) return res.status(404).send({ err: 'Game not found' })
    res.json(game)
  }

  async createGame(req: Request, res: Response) {
    const game = await this.adminService.createGame(req.body)
    res.json(game)
  }

  async getGameState(req: Request, res: Response) {
    const state = await this.adminService.getGameState()
    res.json(state)
  }

  async startGame(req: Request, res: Response) {
    const game = await this.adminService.startGame(
      req.params.id,
      req.query.reset === 'true',
    )
    res.json(game)
    this.io.sockets.emit('events', 'start')
    this.io.sockets.emit(
      'state',
      await this.adminService.getGameState().then((game) => game.id),
    )
    this.io.sockets.to('scoreboard').emit(
      'scoreboard',
      await this.adminService.getScoreboard(
        game.id,
        game.actions.map((a) => a.key),
      ),
    )
  }

  async endGame(req: Request, res: Response) {
    const game = await this.adminService.endGame(req.params.id)
    res.json(game)
    this.io.sockets.emit('events', 'stop')
    this.io.sockets.emit(
      'state',
      await this.adminService.getGameState().then((game) => game.id),
    )
    this.io.engine.emit('stop')
  }

  async getGameSummary(req: Request, res: Response) {
    const game = await this.adminService.getGameByID(req.params.id)
    if (!game) return res.status(404).send({ err: 'Game not found' })
    const summary = await this.adminService.getGameSummary(
      game.id,
      game.actions.map((a) => a.key),
    )
    res.json(summary)
  }

  async setScreenState(req: Request, res: Response) {
    if (req.params.state !== 'full' && req.params.state !== 'overlay')
      return res.status(400)
    const response = await this.adminService.setScreenState(req.params.state)
    this.io.to('scoreboard').emit('screen', req.params.state)
    res.json(response)
  }
}
