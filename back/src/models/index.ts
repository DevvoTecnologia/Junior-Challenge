import { Sequelize } from 'sequelize';
import { env } from '../env';

const url = process.env.DB_URL || 'error';

const sequelize = new Sequelize(url, { dialect: 'postgres' });
export default sequelize;
