import env from '../utils/env'

export default {
  jwt: {
    header: env('AUTH_HEADER'),
  },
}
