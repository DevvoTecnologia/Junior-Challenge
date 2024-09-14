import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesDirectory = path.resolve(__dirname, '../routes')

  readdirSync(routesDirectory).forEach(async (filename) => {
    const filePath = path.join(routesDirectory, filename)
    ;(await import(filePath)).default(router)
  })
}
