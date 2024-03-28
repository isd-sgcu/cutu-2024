

import { Server, Socket } from 'socket.io'
import { createLogger } from '$/utils/logger'
import { AdminService } from '$/service/admin.service'
import { Request, Response } from 'express'

export class AdminController {
  private readonly logger = createLogger('AdminController')
  constructor(
    private readonly io: Server,
    private readonly adminService: AdminService,
  ) { }

  async onConnection(socket: Socket) {
    this.logger.info(`New connection: ${socket.id}`)
    socket.on('submit', async (message) => {
      this.logger.info('Received message', message)
      socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', () => {
      this.logger.info(`Disconnected: ${socket.id}`)
    })

    socket.on('state', (state) => {
      this.logger.info('Received state', state)
      socket.emit('state', state)
    })

    socket.emit('state', await this.adminService.getState())
  }

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
}
