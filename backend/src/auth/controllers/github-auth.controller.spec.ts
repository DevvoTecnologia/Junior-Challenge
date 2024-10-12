import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { type Response } from "express";
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
      imports: [ConfigModule],
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
    it("should return undefined", async () => {
      const req = {
        user: {
          accessToken: "asdX0.hF6awdSkEA1dkwXUZpPLasd6b5DnL1lw",
          userId: 1,
          username: "admin",
          email: null,
        },
      } as unknown as GithubReqUser;

      const res = {
        cookie: jest.fn(),
        redirect: jest.fn(),
      } as unknown as Response;

      expect(await controller.githubSignInCallback(req, res)).toBeUndefined();

      expect(res.cookie).toHaveBeenCalledTimes(5);
      expect(res.cookie).toHaveBeenCalledWith(
        "accessToken",
        "asdX0.hF60cVqQ2LSkEA1dkwXUZpPLasd6b5DnL1lw",
        expect.any(Object),
      );
      expect(res.cookie).toHaveBeenCalledWith(
        "username",
        "admin",
        expect.any(Object),
      );
      expect(res.cookie).toHaveBeenCalledWith(
        "email",
        null,
        expect.any(Object),
      );
      expect(res.cookie).toHaveBeenCalledWith("userId", 1, expect.any(Object));
      expect(res.cookie).toHaveBeenCalledWith(
        "fromServer",
        "true",
        expect.any(Object),
      );
      expect(res.redirect).toHaveBeenCalledWith(
        expect.stringContaining("/login"),
      );
    });
  });
});
