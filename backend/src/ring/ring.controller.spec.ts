import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { RingController } from "./ring.controller";
import { RingService } from "./ring.service";

describe("RingController", () => {
  let controller: RingController;

  const mockRingService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      controllers: [RingController],
      providers: [RingService],
    })
      .overrideProvider(RingService)
      .useValue(mockRingService)
      .compile();

    controller = module.get<RingController>(RingController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
