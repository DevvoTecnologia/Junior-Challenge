import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { cacheTtl } from "src/global/constants";

import { RingController } from "./controllers/ring.controller";
import { Ring } from "./entities/ring.entity";
import { RingService } from "./providers/ring.service";

@Module({
  imports: [
    SequelizeModule.forFeature([Ring]),
    CacheModule.register({
      ttl: cacheTtl,
    }),
  ],
  controllers: [RingController],
  providers: [RingService],
})
export class RingModule {}
