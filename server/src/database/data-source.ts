import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  ssl:
    process.env.DB_SSL === 'true'
      ? {
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
        }
      : undefined,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/config/database/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});
