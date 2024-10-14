import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { join } from "path";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import envGlobal from "./configs/env.global";
import sequelizeAsyncConfig from "./configs/sequelize.config";
import { throttlerGlobalConfig } from "./configs/throttler.config";
import { RingModule } from "./ring/ring.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ThrottlerModule.forRoot([throttlerGlobalConfig]),
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
