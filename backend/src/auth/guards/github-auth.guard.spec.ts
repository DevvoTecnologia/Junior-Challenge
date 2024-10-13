import type { ExecutionContext } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { Response } from "express";
import envTest from "src/configs/env.test";

import { GithubAuthGuard } from "./github-auth.guard";

describe("GithubAuthGuard", () => {
  let guard: GithubAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(envTest)],
      providers: [GithubAuthGuard],
    }).compile();

    guard = module.get<GithubAuthGuard>(GithubAuthGuard);
  });

  it("should be defined", () => {
    expect(guard).toBeDefined();
  });

  describe("handleRequest", () => {
    let context: ExecutionContext;
    let response: Response;

    beforeEach(() => {
      response = {
        redirect: jest.fn(),
      } as never;

      context = {
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue(response),
        }),
      } as never;
    });

    it("should return user if no error and user is present", () => {
      const user = { id: 1, username: "testuser" };
      expect(
        guard.handleRequest(null, true, user as never, context),
      ).toStrictEqual(true);
    });

    it("should redirect to client login page if error or no user", () => {
      guard.handleRequest(new Error(), false, null as never, context);

      expect(response.redirect).toHaveBeenCalledWith(
        "http://localhost:3001/login",
      );
    });
  });
});
