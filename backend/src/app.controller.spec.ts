import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { AppController } from "./app.controller";

describe("AppController", () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("Ping! route should return 'Pong!'", () => {
    expect(controller.ping()).toBe("Pong!");
  });
});
