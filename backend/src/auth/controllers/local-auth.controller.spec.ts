import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { ReqUser } from "src/global/types";

import { LocalAuthController } from "./local-auth.controller";
import { LocalAuthService } from "../providers/local-auth.service";

describe("LocalAuthController", () => {
  let controller: LocalAuthController;

  const mockAuthService = {
    signIn: jest.fn().mockResolvedValue({
      accessToken: "asdX0.hF60cVqQ2LSkEA1dkwXUZpPLasd6b5DnL1lw",
      userId: 1,
      username: "admin",
      email: "admin@admin.com",
    }),
    test: jest.fn().mockResolvedValue({
      sub: 1,
      username: "admin",
      email: "admin@admin.com",
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalAuthController],
      providers: [LocalAuthService],
    })
      .overrideProvider(LocalAuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<LocalAuthController>(LocalAuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("signIn", () => {
    it("should return an object with accessToken, userId, and username", async () => {
      const authDto = {
        email: "admin",
        password: "password",
      };

      const response = await controller.signIn(authDto);

      expect(response).toEqual({
        accessToken: "asdX0.hF60cVqQ2LSkEA1dkwXUZpPLasd6b5DnL1lw",
        userId: 1,
        username: "admin",
        email: "admin@admin.com",
      });
    });
  });

  describe("getProfile", () => {
    it("should return an object with sub and username", async () => {
      const response = controller.getProfile({
        user: {
          sub: 1,
          email: "admin@admin.com",
          username: "admin",
        },
      } as ReqUser);

      expect(response).toEqual({
        sub: 1,
        email: "admin@admin.com",
        username: "admin",
      });
    });
  });
});
