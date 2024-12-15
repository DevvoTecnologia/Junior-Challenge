import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, 
  synchronize: true, 
  logging: false,
  entities: ['./dist/entities/*.js'], 
  migrations: ['./dist/migrations/*.js'], 
  subscribers: [],
  ssl: false, 
});
