import { DataSource, DataSourceOptions } from "typeorm"
import { env } from "../../env"
import { Ring, Forger } from "./models"
import { CreateTaskTable1718032596042 } from "./migrations/1726192530127-CreateRingsTable"
import { CreateForgerTable1726353383965 } from "./migrations/1726353383965-CreateForgerTable"

const options: DataSourceOptions = {
    type: env.DATABASE_TYPE,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [Ring, Forger],
    migrations: [CreateTaskTable1718032596042, CreateForgerTable1726353383965],
}

export const typeOrm = new DataSource(options)