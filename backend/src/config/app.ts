import dotenv from "dotenv";

dotenv.config();

type AppConfig = {
  port: number;
};

export const appConfig = {
  port: Number(process.env.DB_PORT!),
} as AppConfig;
