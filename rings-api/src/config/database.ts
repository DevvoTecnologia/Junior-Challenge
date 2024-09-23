import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('MongoDB Connectado')
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    } else {
      console.error('Erro Unknown')
    }
    process.exit(1)
  }
}

export default connectDB
