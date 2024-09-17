import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config(); 

const config: DataSourceOptions = {
  type: 'mysql', 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3305'), // Default 3306-mysql
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};

const dataSource = new DataSource(config);

export default dataSource;
