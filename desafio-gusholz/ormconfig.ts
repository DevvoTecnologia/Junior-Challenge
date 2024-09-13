import { DataSource } from "typeorm";
import { Ring } from "./src/models/ring";
import 'reflect-metadata';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Ring],
  synchronize: true,
  logging: true,
});

export default AppDataSource;
