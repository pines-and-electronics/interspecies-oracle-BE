/* eslint-disable @typescript-eslint/ban-types */
import { Server, IncomingMessage, ServerResponse } from 'http'
import { Socket as NetSocket } from 'net'
import { Logger } from 'log4js'

interface Socket extends NetSocket {
  isIdle: boolean
}

interface SocketsMap {
  [key: number]: Socket
}

const onRequest = (request: IncomingMessage, response: ServerResponse): void => {
  const socket = request.connection as Socket
  socket.isIdle = false

  response.on('finish', () => {
    socket.isIdle = true
  })
}

const getSockets = (server: Server): SocketsMap => {
  const sockets: SocketsMap = {}
  let nextSocketId = 0

  server.on('request', onRequest)
  server.on('connection', (socket: Socket): void => {
    socket.isIdle = true

    const socketId = nextSocketId++
    sockets[socketId] = socket

    socket.once('close', (): void => {
      delete sockets[socketId]
    })
  })

  return sockets
}

const closeSockets = (sockets: SocketsMap, logger: Logger): void => {
  logger.warn('Closing idle connections.')

  Object.values(sockets).forEach((socket: Socket) => {
    if (socket.isIdle) {
      socket.destroy()
    }
  })
}

const shutdown = async (server: Server, sockets: SocketsMap, logger: Logger, onShutdown?: Function): Promise<void> => {
  closeSockets(sockets, logger)

  if (onShutdown) {
    await onShutdown()
  }

  server.close(err => {
    if (err) {
      logger.error('Error while shutting down', { err })

      return process.exit(1)
    }

    process.exit(0)
  })
}

export default (server: Server, logger: Logger, onShutdown?: Function): void => {
  const sockets: SocketsMap = getSockets(server)

  process.on('SIGINT', async (): Promise<void> => {
    logger.info('Got SIGINT. Graceful shutdown')
    await shutdown(server, sockets, logger, onShutdown)
  })

  process.on('SIGTERM', async (): Promise<void> => {
    logger.info('Got SIGTERM. Graceful shutdown')
    await shutdown(server, sockets, logger, onShutdown)
  })
}
