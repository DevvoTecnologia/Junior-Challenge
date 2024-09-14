import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './config/database'
import ringRoutes from './routes/ringRoutes'
import swaggerRouter from './swagger'

dotenv.config()
const app = express()

connectDB()

app.use(cors())
app.use(bodyParser.json())

app.use('/rings', ringRoutes)
app.use('/api-docs', swaggerRouter)

export default app
