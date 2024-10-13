import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import envGithub from "src/configs/env.github";
import envSecrets from "src/configs/env.secrets";
import { cacheTtl } from "src/global/constants";
import { User } from "src/user/entities/user.entity";

import { GithubAuthController } from "./controllers/github-auth.controller";
import { LocalAuthController } from "./controllers/local-auth.controller";
import { GithubAuthService } from "./providers/github-auth.service";
import { LocalAuthService } from "./providers/local-auth.service";
import { GithubStrategy } from "../strategies/github.strategy";
import { JwtStrategy } from "../strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forFeature(envGithub),
    ConfigModule.forFeature(envSecrets),
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("token.secret"),
        signOptions: { expiresIn: configService.get("token.expiration") },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    CacheModule.register({
      ttl: cacheTtl,
    }),
  ],
  controllers: [LocalAuthController, GithubAuthController],
  providers: [LocalAuthService, JwtStrategy, GithubStrategy, GithubAuthService],
})
export class AuthModule {}
