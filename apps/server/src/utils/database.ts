import { Sequelize } from 'sequelize'

function createConnectionPool() {
  return new Sequelize(
    process.env.DB_NAME || 'cutu',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'postgres',
    {
      port: parseInt(process.env.DB_PORT || '5432'),
      dialect: 'postgres',
      replication: {
        read: [
          ...(process.env.DB_READ_HOST?.split(',').map((url) => ({
            host: url,
          })) || []),
          { host: process.env.DB_HOST || 'db' },
        ],
        write: { host: process.env.DB_HOST || 'db' },
      },
      pool: {
        max: 30,
        idle: 10000,
      },
      sync: {
        force: (process.env.NODE_ENV || 'development') !== 'production',
      },
      logging: false,
    },
  )
}

export const sequelizeConnection = createConnectionPool()
