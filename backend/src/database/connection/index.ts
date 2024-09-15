import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  synchronize: true,
  logging: true,
  logger: "advanced-console",
});

dataSource
  .initialize()
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log("Error connecting database", err);
    throw err;
  });

export default dataSource;
