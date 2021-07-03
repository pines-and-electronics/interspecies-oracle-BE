import Koa, { Context } from 'koa'
import Router from 'koa-router'
import cors from 'koa2-cors'
import { Logger } from 'log4js'
import serverConfig from '../config/server'
import requestLoggerMiddleware from '../middlewares/request-logger'
import server from './apollo'

interface HealthCheck {
  connected?: boolean
  status?: string
}

type HealthChecks = {
  [service: string]: () => HealthCheck
}

export default (logger: Logger, healthChecks?: HealthChecks): Koa => {
  const app = new Koa()
  app.use(requestLoggerMiddleware(logger))
  app.use(cors({ origin: '*' }))

  const router = new Router()
  router.get(`${serverConfig.healthPath}`, async (ctx: Context) => {
    const checks = { server: true }
    if (healthChecks) {
      Object.entries(healthChecks).forEach(([service, callback]) => {
        checks[service] = callback()
      })
    }
    ctx.body = {
      checks,
      misc: {
        server: 'Boilerplate',
        developer: {
          name: 'Sanyam Arya',
          email: 'er.sanyam.arya@gmail.com',
        },
      },
    }
  })

  router.post('/graphql', server().getMiddleware())
  router.get('/graphql', server().getMiddleware())
  app.use(router.routes())
  app.use(router.allowedMethods())
  return app
}
