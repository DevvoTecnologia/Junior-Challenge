import { JwtModule } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { User } from "src/user/entities/user.entity";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userModel: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [AuthService, { provide: getModelToken(User), useValue: {} }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
