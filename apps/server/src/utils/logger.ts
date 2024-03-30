import winston from 'winston'

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

export function createLogger(module: string) {
  return winston.createLogger({
    levels: {
      error: 0,
      http: 1,
      warn: 2,
      info: 3,
      debug: 4,
    },
    level: level(),
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      winston.format.align(),
      winston.format.colorize({ all: true }),
      winston.format.printf(
        (info) =>
          `[${info.timestamp}] ${info.level}: ${info.module} ${info.message}`,
      ),
    ),
    defaultMeta: { module },
  })
}
