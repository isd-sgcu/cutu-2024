import { createClient } from 'redis'
import { Server } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { PlayerService } from './service/player.service'
import { Server as HTTPServer } from 'http'
import express from 'express'
import { PlayerController } from './controller/player.controller'
import { PlayerRouter } from './router/player.router'
import { Express } from 'express'
import { GameRepository } from './models/game.model'
import { AdminRouter } from './router/admin.router'
import { AdminController } from './controller/admin.controller'
import { AdminService } from './service/admin.service'
import { sequelizeConnection } from './utils/database'
import { ClientRepository } from './models/client.model'
import cors from 'cors'
import { createLogger } from './utils/logger'
import createMorganLogger from './middleware/logger.middleware'
import { GameHistoryRepository } from './models/history.model'

export async function initServer(app: Express, server: HTTPServer) {
  app.use(cors())
  app.use(createMorganLogger(createLogger('')))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const logger = createLogger('InitServer')

  const pubClient = createClient({ url: process.env.REDIS_URL })
  const subClient = pubClient.duplicate()

  await pubClient.connect()

  await sequelizeConnection
    .authenticate()
    .then(() => {
      logger.info(' Database Connection has been established successfully.')
    })
    .catch((err) => {
      logger.error('Unable to connect to the database:', { err })
    })
  sequelizeConnection.sync({ force: process.env.FORCE_DB_SYNC === 'true' })

  const gameRepository = new GameRepository()
  const clientRepository = new ClientRepository()
  const gameHistoryRepository = new GameHistoryRepository(pubClient)

  const playerIO = new Server(server, {
    adapter: createAdapter(pubClient, subClient),
    path: `${PlayerRouter.prefix}/ws`,
    cors: {
      origin: '*',
      credentials: true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['fid', 'cid', 'name'],
    },
    allowEIO3: true,
  })
  const playerController = new PlayerController(
    playerIO,
    new PlayerService(gameRepository, clientRepository, gameHistoryRepository),
  )
  playerIO.on(
    'connection',
    playerController.onConnection.bind(playerController),
  )

  const adminController = new AdminController(
    playerIO,
    new AdminService(gameRepository, gameHistoryRepository),
  )

  const playerRouter = new PlayerRouter(playerController)
  const adminRouter = new AdminRouter(adminController)

  app.use(playerRouter.prefix, playerRouter.router)
  app.use(adminRouter.prefix, adminRouter.router)

  app.get('/healthz', (req, res) => {
    res.send('OK')
  })

  return app
}
