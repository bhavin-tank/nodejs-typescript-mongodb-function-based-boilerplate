import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import config from '@bhavin-tank/config'
import errorHandler from '@bhavin-tank/middleware/error.middleware'
import routes from '@bhavin-tank/routes'
import { NotFoundError } from '@bhavin-tank/exceptions/http.errors'

const createApp = (): Application => {
  const app = express()

  // Security middleware
  app.use(cors(config.cors))
  app.use(helmet())
  app.use(compression())

  // Request logging in development
  if (config.env === 'development') {
    app.use(morgan('dev'))
  }

  // Body parsing
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Health check
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    })
  })

  // API routes
  app.use('/api', routes)

  // Handle 404
  app.use((_req, _res, next) => {
    next(new NotFoundError('Route not found'))
  })

  // Error handling
  app.use(errorHandler)

  return app
}

export default createApp
