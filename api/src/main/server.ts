import app from './config/app'
import { env } from '@/env'
import initializeDatabase from '@/infra/typeorm-setup'

const startServer = async () => {
  await initializeDatabase()

  app.listen(env.PORT, () =>
    console.log(`Server running at: http://${env.HOST}:${env.PORT}`),
  )
}

startServer()
