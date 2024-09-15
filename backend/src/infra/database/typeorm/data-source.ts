import 'reflect-metadata';
import { DataSource, DataSourceOptions } from "typeorm"
import { env } from "@/infra/env"
import { Forger, Ring } from './models';

const options: DataSourceOptions = {
    type: env.DATABASE_TYPE,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    synchronize: true,
    entities: [Forger, Ring],
    migrations: ["./migrations/*.ts"],
}

export const typeOrm = new DataSource(options)