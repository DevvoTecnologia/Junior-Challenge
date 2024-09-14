import 'reflect-metadata'
import express from 'express'
// import 'express-async-errors'
import { setupRoutes } from './routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

setupRoutes(app)

// app.use(errorMiddleware)
export default app
