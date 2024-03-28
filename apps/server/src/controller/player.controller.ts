

import { Server, Socket } from 'socket.io'
import { PlayerService } from '$/service/player.service'
import e, { Request, Response } from 'express'
import { createLogger } from '$/utils/logger'

export class PlayerController {
  private readonly logger = createLogger('PlayerController')
  constructor(
    private readonly io: Server,
    private readonly playerService: PlayerService,
  ) { }

  async onConnection(socket: Socket) {
    const { cid, fid, name } = socket.handshake.headers
    if (cid && fid) {
      this.playerService.login(cid as string, fid as string, socket.id)
    }
    else if (name && fid) {
      this.playerService.register(name as string, fid as string, socket.id, socket.handshake.address).then(client => socket.emit("cid", client.cid)).catch((err) => {
        socket.disconnect(true)
      })
    }
    else {
      return socket.disconnect(true);
    }

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

    socket.emit('state', await this.playerService.getState())
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
