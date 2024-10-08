import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import envGlobal from "./configs/env.global";
import sequelizeAsyncConfig from "./configs/sequelize.config";
import { RingModule } from "./ring/ring.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envGlobal],
    }),
    SequelizeModule.forRootAsync(sequelizeAsyncConfig),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "uploads"),
      serveRoot: "/uploads",
      renderPath: "/uploads",
    }),
    RingModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
