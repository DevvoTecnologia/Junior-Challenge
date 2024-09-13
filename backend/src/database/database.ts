import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const connection = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as "mysql",
    timezone: process.env.DB_TIMEZONE,
  }
);
