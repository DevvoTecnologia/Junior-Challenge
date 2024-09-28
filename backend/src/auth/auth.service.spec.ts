import { JwtModule } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { User } from "src/user/entities/user.entity";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let userModel: typeof User;

  const mockUserModel = {
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      username: "admin",
      passwordIsValid: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: "secret",
          signOptions: { expiresIn: "60s" },
        }),
      ],
      providers: [
        AuthService,
        { provide: getModelToken(User), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("signIn", () => {
    it("should throw UnauthorizedException if user does not exist", async () => {
      jest.spyOn(userModel, "findOne").mockResolvedValue(null);

      await expect(
        service.signIn({
          username: "admin",
          password: "password",
        }),
      ).rejects.toThrow("User or password incorrect");
    });

    it("should throw UnauthorizedException if password is invalid", async () => {
      const mockUser = {
        passwordIsValid: jest.fn().mockResolvedValue(false),
      };

      jest
        .spyOn(userModel, "findOne")
        .mockResolvedValue(mockUser as unknown as User);

      await expect(
        service.signIn({
          username: "admin",
          password: "password",
        }),
      ).rejects.toThrow("User or password incorrect");
    });

    it("should return an object with accessToken, userId and username", async () => {
      const mockUser = {
        id: 1,
        username: "admin",
        passwordIsValid: jest.fn().mockResolvedValue(true),
      };

      jest
        .spyOn(userModel, "findOne")
        .mockResolvedValue(mockUser as unknown as User);

      const response = await service.signIn({
        username: "admin",
        password: "password",
      });

      expect(response).toEqual({
        accessToken: expect.any(String),
        userId: 1,
        username: "admin",
      });
    });
  });
});
