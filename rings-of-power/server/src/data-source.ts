import "reflect-metadata";
import { DataSource } from "typeorm";
import { Ring } from "./entity/Ring";
import { Holder } from "./entity/Holder";
import { Forger } from "./entity/Forger";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "yasmin-walsh",
  password: "123",
  database: "rings-of-power",
  synchronize: false,
  logging: true,
  entities: [Ring, Holder, Forger],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
