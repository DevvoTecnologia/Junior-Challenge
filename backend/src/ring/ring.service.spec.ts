import { ConfigModule } from "@nestjs/config";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { Ring } from "./entities/ring.entity";
import { RingService } from "./ring.service";

describe("RingService", () => {
  let service: RingService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let ringModel: typeof Ring;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [RingService, { provide: getModelToken(Ring), useValue: {} }],
    }).compile();

    service = module.get<RingService>(RingService);
    ringModel = module.get<typeof Ring>(getModelToken(Ring));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
