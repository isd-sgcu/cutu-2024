import winston from 'winston'

export function createLogger(module: string) {
  return winston.createLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    defaultMeta: { module },
  })
}
