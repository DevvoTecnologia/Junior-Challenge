import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: env === 'test' ? '.testing.env' : '.env' });

const url = process.env.DB_URL || 'error';

const sequelize = new Sequelize(url, { dialect: 'postgres', logging: false });

export default sequelize;
