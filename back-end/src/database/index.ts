import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Ring } from '../models/Ring';
import { env } from '../config/envSchema';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [User,Ring],
    synchronize: false, 
});

export default AppDataSource;
