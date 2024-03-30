import { Server, Socket } from 'socket.io'
import { PlayerService } from '$/service/player.service'
import { Request, Response } from 'express'
import { createLogger } from '$/utils/logger'

export class PlayerController {
  private readonly logger = createLogger('PlayerController')
  constructor(
    private readonly io: Server,
    private readonly playerService: PlayerService,
  ) {}

  async authenticateSocket(socket: Socket) {
    const cid = (socket.handshake.headers.cid ||
      socket.handshake.auth.cid) as string
    const fid = (socket.handshake.headers.fid ||
      socket.handshake.auth.fid) as string
    const name = (socket.handshake.headers.name ||
      socket.handshake.auth.name) as string

    const ip = (socket.handshake.headers['x-forwarded-for'] ||
      socket.handshake.address) as string

    if (cid && fid) {
      await this.playerService
        .login(cid, fid, socket.id)
        .then((client) => (socket.user = client))
        .catch((err) => {
          this.logger.error(err)
          socket.disconnect(true)
        })
    } else if (name && fid) {
      await this.playerService
        .register(name, fid, socket.id, ip)
        .then((client) => {
          socket.user = client
          socket.emit('cid', client.cid)
        })
        .catch((err) => {
          this.logger.error(err)
          socket.disconnect(true)
        })
    } else socket.disconnect(true)
  }

  async onConnection(socket: Socket) {
    this.logger.info(`New connection: ${socket.id}`)

    this.authenticateSocket(socket).then(() => {
      this.playerService.getGameState().then((game) => {
        socket.emit('state', game.id)
        socket.emit('events', game.status)
      })
    })

    socket.on('subscribe', (m, cb) => {
      socket.join('scoreboard')
      this.playerService.getGameState().then((game) => {
        if (game.id && game.game && game.status === 'playing')
          this.playerService
            .getScoreboard(
              game.id,
              game.game.actions.map((a: any) => a.key),
            )
            .then((score) => {
              socket.emit('scoreboard', score)
            })
      })
    })

    socket.on('submit', async (message) => {
      this.logger.debug('Received message: ' + String(message).trim())
      const data = String(message).trim().split(' ')
      this.playerService
        .submit(socket.user, data[0], parseInt(data[1]))
        .then((game) => {
          this.logger.debug(`Incremented: ${String(message).trim()}`)
          if (game.id && game.game) {
            this.logger.debug('Getting scoreboard updated')
            return this.playerService
              .getScoreboard(
                game.id,
                game.game.actions.map((a) => a.key),
              )
              .then((score) =>
                this.io.to('scoreboard').emit('scoreboard', score),
              )
          }
        })
        .catch((err) => {
          this.logger.warn('Failed to increment: ' + err)
          socket.disconnect(true)
        })
    })

    socket.on('disconnect', () => {
      this.logger.info(`Disconnected: ${socket.id}`)
    })
  }

  async getGames(req: Request, res: Response) {
    return this.playerService
      .getGame(req.params.id)
      .then((game) => {
        res.json(game)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  }
}
