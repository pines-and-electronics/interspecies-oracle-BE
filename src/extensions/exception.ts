import { Logger } from 'log4js'

export default (logger: Logger): void => {
  process.on('unhandledRejection', reason => {
    throw reason
  })

  process.on('uncaughtException', error => {
    logger.error(error.message, { err: error, context: { message: 'Uncaught exception' } })
  })
}
