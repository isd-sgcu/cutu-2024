import { Server, Socket } from 'socket.io'
import { PlayerService } from '$/service/player.service'
import { Request, Response } from 'express'
import { createLogger } from '$/utils/logger'

export class PlayerController {
  private readonly logger = createLogger('PlayerController')
  private interval: NodeJS.Timeout | null = null
  constructor(
    private readonly io: Server,
    private readonly playerService: PlayerService,
  ) {
    this.interval = setInterval(async () => {
      await this.playerService
        .getScreenState()
        .then((state) => this.io.sockets.to('scoreboard').emit('screen', state))
        .catch((err) => {
          this.logger.error(err)
        })
    }, 5000)
  }

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

    await this.authenticateSocket(socket)
    await this.playerService.getGameState().then((game) => {
      socket.emit('state', game.id)
      socket.emit('events', game.status)
    })

    socket.on('subscribe', (m, cb) => {
      socket.join('scoreboard');
      this.playerService.getGameState().then((game) => {
        if (game.id && game.game && game.status === 'playing')
          this.playerService
            .getScoreboard(game.id, game.game.actions.map((a) => a.key))
            .then((score) => {
              socket.emit('scoreboard', score)
            })
      })
    })

    socket.on('submit', async (message) => {
      this.logger.info('Received message', message)
      const data = message.split(' ')
      this.playerService
        .submit(socket.user, data[0], parseInt(data[1]))
        .then((game) => {
          if (game.id && game.game)
            return this.playerService
              .getScoreboard(game.id, game.game.actions.map((a) => a.key))
              .then((score) =>
                this.io.sockets.to('scoreboard').emit('scoreboard', score),
              )
        }
        )
        .catch((err) => {
          this.logger.error(err)
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
