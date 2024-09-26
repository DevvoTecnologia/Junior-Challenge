import { ConfigModule, ConfigService } from "@nestjs/config";
import type { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";
import type { Dialect } from "sequelize";

const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      dialect: configService.get("database.dialect") as Dialect,
      host: configService.get("database.host"),
      port: configService.get("database.port"),
      username: configService.get("database.username"),
      password: configService.get("database.password"),
      database: configService.get("database.name"),
      autoLoadModels: configService.get("nodeEnv") !== "production",

      dialectOptions: {
        timezone: "-03:00",
      },

      timezone: "-03:00",

      define: {
        timestamps: true,
        underscored: true,
      },
    };
  },
  inject: [ConfigService],
};

export default sequelizeAsyncConfig;
