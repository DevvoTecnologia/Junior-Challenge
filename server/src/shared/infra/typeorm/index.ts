import { DataSource } from "typeorm"

export const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
})

export const createConnection = async () => {
  return dataSource.initialize();
  
  // let retries = 5;
  // while (retries) {
  //   try {
  //     await dataSource.initialize();
  //     console.log("Data Source has been initialized!");
  //     break;
  //   } catch (err) {
  //     console.error("Error during Data Source initialization", err);
  //     retries -= 1;
  //     console.log(`Retries left: ${retries}`);
  //     await new Promise(res => setTimeout(res, 5000)); // wait for 5 seconds before retrying
  //   }
  // }
}