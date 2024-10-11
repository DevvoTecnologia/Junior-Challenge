import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { Response } from "express";
import type { GithubReqUser } from "src/global/types";

import { AuthService } from "../auth.service";
import { GithubAuthController } from "./github-auth.controller";

describe("GithubAuthController", () => {
  let controller: GithubAuthController;

  const mockAuthService = {
    signInWithGithub: jest.fn().mockResolvedValue({
      accessToken: "asdX0.hF60cVqQ2LSkEA1dkwXUZpPLasd6b5DnL1lw",
      userId: 1,
      username: "admin",
      email: null,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubAuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<GithubAuthController>(GithubAuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("githubSignIn", () => {
    it("should return undefined", () => {
      expect(controller.githubSignIn()).toBeUndefined();
    });
  });

  describe("githubSignInCallback", () => {
    it("should return a user", async () => {
      const req = {
        user: {
          sub: 1,
          username: "admin",
          email: null,
        },
      } as unknown as GithubReqUser;

      expect(
        await controller.githubSignInCallback(req, {} as Response),
      ).toEqual({
        accessToken: "asdX0.hF60cVqQ2LSkEA1dkwXUZpPLasd6b5DnL1lw",
        userId: 1,
        username: "admin",
        email: null,
      });
    });
  });
});
