import { prod } from '../config'

const devConfig = {
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 8000,
  ws: process.env.APP_WS || 8001,
  jwt: process.env.JWT_KEY || 'ThisIsYourJWTSecretKey',
}

const prodConfig = {
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 8000,
  ws: process.env.APP_WS || 8001,
  jwt: process.env.JWT_KEY || 'ThisIsYourJWTSecretKey',
}

const config = prod ? prodConfig : devConfig
export default config