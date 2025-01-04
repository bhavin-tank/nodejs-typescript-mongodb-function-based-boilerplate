import createApp from '@bhavin-tank/app'
import connectDatabase from '@bhavin-tank/config/database'
import config from '@bhavin-tank/config'

const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase()

    // Create Express app
    const app = createApp()

    // Start server
    const server = app.listen(config.port, () => {
      console.log(`
        🚀 Server ready at http://localhost:${config.port}
        ⭐️ Environment: ${config.env}
      `)
    })

    // Handle unhandled rejections
    process.on('unhandledRejection', (error: Error) => {
      console.error('UNHANDLED REJECTION! 💥 Shutting down...')
      console.error(error.name, error.message)

      // Gracefully close server & exit process
      server.close(() => {
        process.exit(1)
      })
    })

    // Handle SIGTERM
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
      server.close(() => {
        console.log('💥 Process terminated!')
      })
    })
  } catch (error) {
    console.error('Unable to start server:', error)
    process.exit(1)
  }
}

startServer().then()
