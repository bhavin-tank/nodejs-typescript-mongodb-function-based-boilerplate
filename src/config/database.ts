import mongoose from 'mongoose'
import config from '@bhavin-tank/config'

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.database.url)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDatabase
