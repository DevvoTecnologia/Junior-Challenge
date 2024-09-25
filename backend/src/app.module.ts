import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { AppController } from "./app.controller";
import envGlobal from "./configs/env.global";
import sequelizeAsyncConfig from "./configs/sequelize.config";
import { RingModule } from "./ring/ring.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envGlobal],
    }),
    SequelizeModule.forRootAsync(sequelizeAsyncConfig),
    RingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
