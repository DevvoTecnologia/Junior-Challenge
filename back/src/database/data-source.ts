import "reflect-metadata"
import "dotenv/config";
import { DataSource } from "typeorm"
import { Anel } from "../app/entities/Anel";
import { CreateAnelTable1726329062930 } from "./migrations/1726329062930-CreateAnelTable";

const { DB_USER, DB_PASS, DB_NAME, DB_HOST } = process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: 3306,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Anel],
    migrations: [CreateAnelTable1726329062930],
    subscribers: [],
})
