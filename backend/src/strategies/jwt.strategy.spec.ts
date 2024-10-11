import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { JwtPayload } from "src/global/types";

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
    const payload: JwtPayload = {
      sub: 123,
      username: "testUser",
      email: "admin@admin.com",
      iat: 651651,
      exp: 651651,
    };
    const result = jwtStrategy.validate(payload);
    expect(result).toEqual({ sub: 123, username: "testUser" });
  });
});
