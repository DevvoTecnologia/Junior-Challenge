import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { SequelizeModule } from "@nestjs/sequelize";
import envGithub from "src/configs/env.github";
import { User } from "src/user/entities/user.entity";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GithubAuthService } from "./providers/github-auth.service";
import { GithubStrategy } from "../strategies/github.strategy";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { GithubAuthController } from "./controllers/github-auth.controller";

@Module({
  imports: [
    ConfigModule.forFeature(envGithub),
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
      ttl: 60000 * 10, // 10 minutes
    }),
  ],
  controllers: [AuthController, GithubAuthController],
  providers: [AuthService, JwtStrategy, GithubStrategy, GithubAuthService],
})
export class AuthModule {}
