import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Ring } from './models/Ring';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  models: [Ring],
});

sequelize.authenticate().catch(err => {
    console.error('Erro de autenticação:', err);
});