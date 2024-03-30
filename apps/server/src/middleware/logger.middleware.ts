import winston from 'winston'
import morgan from 'morgan'
import split from 'split'

export default function createMorganLogger(logger: winston.Logger) {
  return morgan(
    ':remote-addr :method :url :status :res[content-length] - :response-time ms',
    {
      stream: split().on('data', (message) => {
        logger.http(message)
      }),
    },
  )
}
