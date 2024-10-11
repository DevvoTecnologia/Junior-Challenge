import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { User } from "src/user/entities/user.entity";

import { LocalAuthService } from "./local-auth.service";

describe("LocalAuthService", () => {
  let service: LocalAuthService;
  let userModel: typeof User;

  const mockUserModel = {
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      username: "admin",
      email: "admin@admin.com",
      passwordIsValid: jest.fn(),
    }),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue("accessToken"),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getModelToken(User), useValue: mockUserModel },
        LocalAuthService,
        JwtService,
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<LocalAuthService>(LocalAuthService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("userModel should be defined", () => {
    expect(userModel).toBeDefined();
  });

  describe("signIn", () => {
    it("should return an object", async () => {
      const user = await userModel.findOne();
      const result = await service.signIn(user as User);

      expect(result).toEqual({
        accessToken: "accessToken",
        userId: 1,
        username: "admin",
        email: "admin@admin.com",
      });
    });
  });
});
