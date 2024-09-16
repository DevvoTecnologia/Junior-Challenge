import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CLUSTER!)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }   
}
