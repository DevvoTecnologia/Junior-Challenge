import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";

import { RingController } from "./controllers/ring.controller";
import { Ring } from "./entities/ring.entity";
import { RingService } from "./providers/ring.service";

@Module({
  imports: [
    SequelizeModule.forFeature([Ring]),
    ConfigModule,
    JwtModule,
    CacheModule.register({
      ttl: 60000 * 10, // 10 minutes
    }),
  ],
  controllers: [RingController],
  providers: [RingService],
})
export class RingModule {}
