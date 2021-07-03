import env from '../utils/env'
import path from 'path'
import fs from 'fs'
export default {
  key: {
    private: fs.readFileSync(path.join(__dirname, '../../key/private.key'), 'utf8'),
    public: fs.readFileSync(path.join(__dirname, '../../key/public.key'), 'utf8'),
  },
  options: {
    issuer: env('AUTHORIZATION_ISSUER'),
    expiresIn: env('AUTHORIZATION_EXPIRES_IN'),
    algorithm: env('AUTHORIZATION_ALGORITHM'),
  },
  type: env('AUTHORIZATION_TOKEN_TYPE', 'Bearer'),
}
