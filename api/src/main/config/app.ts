import 'express-async-errors'
import 'reflect-metadata'
import express from 'express'
import { setupRoutes } from './routes'
import { errorMiddleware } from '../middlewares/errorMiddleware'
import { env } from '@/env'
import cors from 'cors'

const app = express()

const corsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

setupRoutes(app)

app.use(errorMiddleware)
export default app
