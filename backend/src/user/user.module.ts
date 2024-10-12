import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";

import { GithubUserController } from "./controllers/github-user.controller";
import { LocalUserController } from "./controllers/local-user.controller";
import { User } from "./entities/user.entity";
import { GithubUserService } from "./providers/github-user.service";
import { LocalUserService } from "./providers/local-user.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    ConfigModule,
    JwtModule,
    CacheModule.register({
      ttl: 60000 * 10, // 10 minutes
    }),
  ],
  controllers: [LocalUserController, GithubUserController],
  providers: [LocalUserService, GithubUserService],
})
export class UserModule {}
