import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { ReqUser } from "src/global/types";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;

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
      imports: [JwtModule, ConfigModule],
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
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
