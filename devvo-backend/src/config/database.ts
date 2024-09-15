import { DataSource } from "typeorm";
import { Ring } from "../domain/entities/Ring";
import { Portador } from "../domain/entities/Portador";
import { Forjador } from "../domain/entities/Forjador";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Ring, Portador, Forjador], 
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
});
