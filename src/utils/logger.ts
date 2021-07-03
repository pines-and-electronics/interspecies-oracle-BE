import { configure, getLogger } from 'log4js'
import serverConf from '../config/server'

const logger = getLogger()
const appenders = {
  external: { type: 'file', filename: 'info.log', layout: { type: 'messagePassThrough' } },
  out: { type: 'stdout', layout: { type: 'colored' } },
}

const categories = { default: { appenders: ['external'], level: serverConf.log.level } }

if (serverConf.env.is.dev) {
  categories.default.appenders.push('out')
}

configure({
  appenders,
  categories,
})

export default logger
