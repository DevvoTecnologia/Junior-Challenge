import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { RingController } from "./ring.controller";
import { RingService } from "./ring.service";

describe("RingController", () => {
  let controller: RingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RingController],
      providers: [RingService],
    }).compile();

    controller = module.get<RingController>(RingController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
