import { Module } from "@nestjs/common";

import { RingController } from "./ring.controller";
import { RingService } from "./ring.service";

@Module({
  controllers: [RingController],
  providers: [RingService],
})
export class RingModule {}
