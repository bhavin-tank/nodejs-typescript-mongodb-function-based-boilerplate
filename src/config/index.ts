import dotenv from 'dotenv'
import { validateEnv } from '@bhavin-tank/utils/config.utils'

dotenv.config()

const requiredEnvs = ['PORT', 'MONGODB_URI', 'JWT_SECRET']

validateEnv(requiredEnvs)

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.MONGODB_URI!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  bcrypt: {
    saltRounds: 10,
  },
} as const

export default config
