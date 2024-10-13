import { JwtModule } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { User } from "src/user/entities/user.entity";

import { LocalAuthService } from "./local-auth.service";
import type { AuthDto } from "../dto/auth.dto";

describe("LocalAuthService", () => {
  let service: LocalAuthService;
  let userModel: typeof User;

  const mockUserModel = {
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      username: "admin",
      email: "admin@admin.com",
      passwordIsValid: jest.fn(() => true),
      canSignWithEmailAndPassword: true,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: "secret",
          signOptions: { expiresIn: "1d" },
        }),
      ],
      providers: [
        { provide: getModelToken(User), useValue: mockUserModel },
        LocalAuthService,
      ],
    }).compile();

    service = module.get<LocalAuthService>(LocalAuthService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("user model should be defined", () => {
    expect(userModel).toBeDefined();
  });

  describe("signIn", () => {
    it("should return an object with accessToken, userId, username and email", async () => {
      const authDto = {
        email: "admin@admin.com",
        password: "admin",
      };

      const response = await service.signIn(authDto);

      expect(response).toEqual({
        accessToken: expect.any(String),
        userId: 1,
        username: "admin",
        email: "admin@admin.com",
      });
    });

    it("should throw an UnauthorizedException if user does not exist", async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      const authDto = {
        email: "admin@admin.com",
        password: "admin",
      };

      await expect(service.signIn(authDto)).rejects.toThrow(
        "User or password incorrect",
      );
    });

    it("should throw an UnauthorizedException if user can not sign with email and password", async () => {
      mockUserModel.findOne.mockResolvedValue({
        id: 1,
        username: "admin",
        email: null,
        passwordIsValid: jest.fn(() => true),
        canSignWithEmailAndPassword: false,
      });

      const authDto = {
        email: null,
        password: "admin",
      } as unknown as AuthDto;

      await expect(service.signIn(authDto)).rejects.toThrow(
        "User or password incorrect",
      );
    });

    it("should throw an UnauthorizedException if password is invalid", async () => {
      mockUserModel.findOne.mockResolvedValue({
        id: 1,
        username: "admin",
        email: "admin@admin.com",
        passwordIsValid: jest.fn(() => false),
        canSignWithEmailAndPassword: true,
      });

      const authDto = {
        email: "admin@admin.com",
        password: "admin",
      };

      await expect(service.signIn(authDto)).rejects.toThrow(
        "User or password incorrect",
      );
    });
  });
});
