import { DataSource, DataSourceOptions } from "typeorm"
import { env } from "@/env"
import { Ring } from "@/models/ring"

const options: DataSourceOptions = {
    type: env.DATABASE_TYPE,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [Ring],
    migrations: env.NODE_ENV === "test"
        ? []
        : [`${__dirname}/migrations/*{.js,.ts}`],
}

const typeOrm = new DataSource(options)

export { typeOrm }