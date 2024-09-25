import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { Ring } from "./entities/ring.entity";
import { RingController } from "./ring.controller";
import { RingService } from "./ring.service";

@Module({
  imports: [SequelizeModule.forFeature([Ring])],
  controllers: [RingController],
  providers: [RingService],
})
export class RingModule {}
