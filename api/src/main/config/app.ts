import 'express-async-errors'
import 'reflect-metadata'
import express from 'express'
import { setupRoutes } from './routes'
import { errorMiddleware } from '../middlewares/errorMiddleware'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

setupRoutes(app)

app.use(errorMiddleware)
export default app
