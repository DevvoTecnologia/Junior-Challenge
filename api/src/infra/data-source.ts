import 'reflect-metadata'
import { DataSource } from 'typeorm'
import path from 'path'
import { env } from '@/env'
import { User } from './entities/User'
import { Artifact } from './entities/Artifact'
import { Smith } from './entities/Smith'
import { Character } from './entities/Character'

const __dirname = path.resolve()

console.log(env.DB_SSL)

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: env.DB_PORT || 5433,
  username: env.DB_USERNAME || 'gustavo',
  password: env.DB_PASSWORD || '1234',
  database: env.DB_NAME || 'artifact-hub',
  ssl: false,
  synchronize: env.DB_SYNCHRONIZE,
  logging: false,
  entities: [User, Artifact, Smith, Character],
  migrations:
    process.env.NODE_ENV === 'development'
      ? [path.join(__dirname, 'src/infra/migrations/**/*.ts')]
      : [path.join(__dirname, 'dist/infra/migrations/**/*.js')],
  subscribers: [],
})
