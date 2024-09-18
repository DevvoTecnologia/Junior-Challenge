import { DataSource } from 'typeorm';
import { env } from '../env';
import { CreateRingPower1726229499926 } from './migrations/1726229499926-CreateRingPower';
import { Ring } from '../models/Ring';


export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.TYPEORM_HOST,
  port: parseInt(env.TYPEORM_PORT),
  username: env.TYPEORM_USER,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Ring],
  subscribers: [],
  migrations: [
    CreateRingPower1726229499926,
  ],
});