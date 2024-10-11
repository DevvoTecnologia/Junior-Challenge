import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { Profile } from "passport-github2";
import envTest from "src/configs/env.test";

import { GithubStrategy } from "./github.strategy";

describe("GithubStrategy", () => {
  let githubStrategy: GithubStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(envTest)],
      providers: [GithubStrategy],
    }).compile();

    githubStrategy = module.get<GithubStrategy>(GithubStrategy);
  });

  it("should be defined", () => {
    expect(githubStrategy).toBeDefined();
  });

  it("should validate and return user object", () => {
    const _accessToken = "accessToken";
    const _refreshToken = "refreshToken";
    const profile = {
      username: "testUser",
      id: "123",
      emails: [{ value: "" }],
    } as Profile;

    const result = githubStrategy.validate(
      _accessToken,
      _refreshToken,
      profile,
    );

    expect(result).toEqual({
      username: "testUser",
      githubUserId: "123",
      email: "",
    });
  });
});
