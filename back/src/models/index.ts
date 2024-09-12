import { Sequelize } from 'sequelize';
import { env } from '../env';
import { PostgresDialect } from '@sequelize/postgres';
console.log(
  env.DB_HOST,
  env.DB_NAME,
  env.DB_PASSWORD,
  env.DB_PORT,
  env.DB_URL,
  env.DB_USER
);
const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: env.DB_HOST, // Corrigido para DB_HOST
    logging: false,
  } // Corrigido para DB_PASSWORD
  // port: env.DB_PORT, // O valor já é um número após a transformação
  // ssl: true,
  // clientMinMessages: 'notice',
);

export default sequelize;
