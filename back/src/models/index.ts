import { Sequelize } from 'sequelize';
import { env } from '../env';

const url = env.DB_URL || 'error';

const sequelize = new Sequelize(url, { dialect: 'postgres', logging: false });

export default sequelize;
