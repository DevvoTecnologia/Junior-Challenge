import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { AppController } from "./app.controller";
import { Ring } from "./ring/entities/ring.entity";
import { RingModule } from "./ring/ring.module";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "192.168.100.3",
      port: 3306,
      username: "root",
      password: "toor",
      database: "ringdb",
      models: [Ring],
      autoLoadModels: true,
    }),
    RingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
