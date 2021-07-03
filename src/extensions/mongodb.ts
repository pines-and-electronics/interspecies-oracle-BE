import { Logger } from 'log4js'
import Mongoose, { Connection, ConnectionOptions } from 'mongoose'
import databaseConfig from '../config/database'

const connectionStatus = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting']
type databaseHealthCheck = {
  status: string
}

export type mongoDbExtension = {
  healthCheck(): databaseHealthCheck
}

let connection: Connection

export const connectMongoDB = (logger: Logger): mongoDbExtension => {
  const uri = databaseConfig.mongodb.uri

  const options: ConnectionOptions = databaseConfig.mongodb.options
  if (connection) {
    return
  }
  Mongoose.connect(uri, options)
  connection = Mongoose.connection

  connection.once('open', async () => {
    logger.info(`Connected to database`)
  })

  connection.on('error', () => {
    logger.info('Error connecting to database')
  })

  return {
    healthCheck(): databaseHealthCheck {
      return { status: connectionStatus[connection.readyState] }
    },
  }
}
export const disconnectMongoDB = (logger: Logger): void => {
  logger.info('MongoDB connection disconnected')
  if (!connection) {
    return
  }
  Mongoose.disconnect()
}
