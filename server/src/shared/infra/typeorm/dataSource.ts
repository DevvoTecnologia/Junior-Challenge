import { DataSource } from "typeorm"
import { Ring as RingEntity } from "../../../modules/rings/domain/Rings";

export const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  migrations: ["build/shared/infra/typeorm/migrations/*.js"],
  entities: [RingEntity],
})

export const createConnection = async () => {
  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
}

export const createConnectionTest = () => {
  return dataSource.initialize();
}