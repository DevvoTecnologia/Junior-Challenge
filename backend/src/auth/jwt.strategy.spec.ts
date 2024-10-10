import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { ReqUser } from "src/global/types";

import { JwtStrategy } from "./jwt.strategy";

describe("JwtStrategy", () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === "token.secret") {
                return "testSecret";
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it("should be defined", () => {
    expect(jwtStrategy).toBeDefined();
  });

  it("should validate and return user object", () => {
    const payload: ReqUser["user"] = { sub: 123, username: "testUser" };
    const result = jwtStrategy.validate(payload);
    expect(result).toEqual({ sub: 123, username: "testUser" });
  });
});
