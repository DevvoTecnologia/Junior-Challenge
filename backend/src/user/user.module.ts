import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { cacheTtl } from "src/global/constants";

import { GithubUserController } from "./controllers/github-user.controller";
import { LocalUserController } from "./controllers/local-user.controller";
import { User } from "./entities/user.entity";
import { GithubUserService } from "./providers/github-user.service";
import { LocalUserService } from "./providers/local-user.service";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    CacheModule.register({
      ttl: cacheTtl,
    }),
  ],
  controllers: [LocalUserController, GithubUserController],
  providers: [LocalUserService, GithubUserService],
})
export class UserModule {}
