import { Express, Router } from 'express'
import artifactsRoutes from '../routes/artifacts'
import authRoutes from '../routes/auth'
import charactersRoutes from '../routes/characters'
import smithsRoutes from '../routes/smiths'
import usersRoutes from '../routes/users'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  artifactsRoutes(router)
  authRoutes(router)
  charactersRoutes(router)
  smithsRoutes(router)
  usersRoutes(router)
}
