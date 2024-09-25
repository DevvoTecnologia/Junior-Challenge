import type { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";
import type { Dialect } from "sequelize";
import { Ring } from "src/ring/entities/ring.entity";

const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  useFactory: () => {
    return {
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Ring],
      autoLoadModels: true,
    };
  },
};

export default sequelizeAsyncConfig;
