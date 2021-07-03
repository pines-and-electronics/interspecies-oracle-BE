import request from 'supertest'
import Application from 'koa'
import { config } from 'dotenv'
import path from 'path'

import logger from '../../src/utils/logger'
import httpStatusCode from '../../src/utils/http-status-code'
import koaExtension from '../../src/extensions/koa'

config({ path: path.resolve(process.cwd(), '../../.env.application') })

describe('GET /health', () => {
  let app: Application

  test('it returns the health of the server if no additional checks are provided', async () => {
    app = koaExtension(logger)
    const response = await request(app.callback()).get(`/boilerplate/health`)

    expect(response.status).toBe(httpStatusCode.NOT_FOUND)
    // expect(response.body).toStrictEqual({ server: true })
  })
})
