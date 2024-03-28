

import { Sequelize } from 'sequelize'

function createConnectionPool() {
  return new Sequelize({
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME || 'cutu',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    sync: {
      force: (process.env.NODE_ENV || 'development') !== 'production',
    },
  })
}

export const sequelizeConnection = createConnectionPool()
