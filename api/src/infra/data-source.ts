import 'reflect-metadata'
import { DataSource } from 'typeorm'
import path from 'path'
import { env } from '@/env'

const __dirname = path.resolve()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: env.DB_PORT || 5433,
  username: env.DB_USERNAME || 'gustavo',
  password: env.DB_PASSWORD || '1234',
  database: env.DB_NAME || 'artifact-hub',
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, 'src/infra/entities/**/*.ts')],
  migrations: [path.join(__dirname, 'src/infra/migrations/**/*.ts')],
  subscribers: [],
})
