import { Server, Socket } from 'socket.io'
import { PlayerService } from '$/service/player.service'
import { Request, Response } from 'express'
import { createLogger } from '$/utils/logger'

export class PlayerController {
  private readonly logger = createLogger('PlayerController')
  constructor(
    private readonly io: Server,
    private readonly playerService: PlayerService,
  ) { }

  async onConnection(socket: Socket) {
    const cid = socket.handshake.headers.cid || socket.handshake.auth.cid
    const fid = socket.handshake.headers.fid || socket.handshake.auth.fid
    const name = socket.handshake.headers.name || socket.handshake.auth.name
    if (cid && fid) {
      await this.playerService
        .login(cid as string, fid as string, socket.id)
        .then((client) => {
          if (client[0] === 0) return socket.disconnect(true)
          socket.user = client[1][0]
        })
        .catch((err) => {
          this.logger.error(err)
          socket.disconnect(true)
        })
    } else if (name && fid) {
      await this.playerService
        .register(
          name as string,
          fid as string,
          socket.id,
          socket.handshake.address,
        )
        .then((client) => {
          socket.user = client
          socket.emit('cid', client.cid)
        })
        .catch((err) => {
          this.logger.error(err)
          socket.disconnect(true)
        })
    } else socket.disconnect(true)

    this.logger.info(`New connection: ${socket.id}`)
    socket.emit('state', await this.playerService.getLastGame())

    socket.on('submit', async (message) => {
      this.logger.info('Received message', message)
      const data = message.split(' ')
      this.playerService
        .submit(socket.user, data[0], parseInt(data[1]))
        .catch((err) => {
          this.logger.error(err)

          socket.disconnect(true)
        })
    })

    setInterval(async () => {
      await this.playerService
        .getScoreboard()
        .then((score) => {
          const scoreboard =
            score
              ?.map((s) => {
                return `${s.key} ${s.total_vote}`
              })
              .join(' ') || '-1'
          socket.emit('scoreboard', scoreboard)
        })
        .catch((err) => {
          this.logger.error(err)
        })
    }, 500)

    socket.emit('events', await this.playerService.getState())

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
