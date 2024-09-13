import dotenv from "dotenv";

dotenv.config();

export interface IDatabaseConfig {
  host: string;
  dialect: string;
  timezone: string;
}

export const databaseConfig: IDatabaseConfig = {
  host: process.env.DB_HOST!,
  dialect: process.env.DB_DIALECT as "mysql",
  timezone: process.env.DB_TIMEZONE!,
};
