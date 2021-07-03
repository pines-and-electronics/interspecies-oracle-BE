import { Context, Next } from 'koa'
import { Logger } from 'log4js'
export default (logger: Logger) =>
  async (ctx: Context, next: Next): Promise<void> => {
    const started = Date.now()
    await next()
    const elapsed = Date.now() - started + 'ms'

    const msg = `${ctx.method}: ${ctx.url} - ${ctx.status} | ${ctx.type} | [${elapsed}]`
    logger.debug(msg)
  }
