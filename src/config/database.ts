import env from '../utils/env'

export default {
  mongodb: {
    uri: env('MONGODB_CONNECTION_URL'),
    options: {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
}
