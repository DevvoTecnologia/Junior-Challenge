import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";
import type { Dialect } from "sequelize";

import envDatabase from "./env.database";

const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule.forFeature(envDatabase)],
  useFactory: (configService: ConfigService) => {
    const logger = new Logger("SequelizeConfig");
    const nodeEnv = configService.get("nodeEnv");

    const host = configService.get("database.mysql.host");
    const port = configService.get("database.mysql.port");
    const username = configService.get("database.mysql.username");
    const password = configService.get("database.mysql.password");
    const database = configService.get("database.mysql.name");

    return {
      dialect: configService.get("database.mysql.dialect") as Dialect,
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      autoLoadModels: true,

      dialectOptions: {
        timezone: "-03:00",
      },

      timezone: "-03:00",

      define: {
        timestamps: true,
        underscored: true,
      },

      logging: (sql): false | void => {
        if (nodeEnv === "development") {
          return logger.debug(sql);
        }
        return false;
      },

      sync: {
        force: false,
      },
    };
  },
  inject: [ConfigService],
};

export default sequelizeAsyncConfig;
