import express from 'express'
import { initServer } from './server'
import { createLogger } from './utils/logger'
import { createServer } from 'http'
import { configDotenv } from 'dotenv'
import winston from 'winston'

configDotenv({ path: '.env' })
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
})
const logger = createLogger('MainContext')
const app = express()
const server = createServer(app)

logger.info('Starting application')

initServer(app, server)
  .then(() =>
    server.listen(3000, () => {
      logger.info('Server running on port 3000')
    }),
  )
  .catch((err) => {
    logger.error('Error initializing server', err)
    process.exit(1)
  })
