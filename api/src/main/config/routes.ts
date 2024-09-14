import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesDir = path.resolve(__dirname, '../routes')
  readdirSync(routesDir).forEach(async (filename) => {
    const filePath = path.join(routesDir, filename)
    if (path.extname(filePath) === '.ts' || path.extname(filePath) === '.js') {
      try {
        const routeModule = await import(`file://${filePath}`)
        if (routeModule.default) {
          routeModule.default(router)
        }
      } catch (error) {
        console.error(`Erro ao carregar o módulo ${filename}:`, error)
      }
    }
  })
}
