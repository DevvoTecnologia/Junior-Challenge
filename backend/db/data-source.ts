import 'dotenv/config';

import { DataSource } from 'typeorm';
import { Ring } from '../src/models/Ring';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5433', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Ring],
  migrations: ['dist/migrations/**/*.js'],
  synchronize: true,
});

export default AppDataSource;
