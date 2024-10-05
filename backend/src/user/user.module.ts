import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";

import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [SequelizeModule.forFeature([User]), ConfigModule, JwtModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
