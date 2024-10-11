import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { GithubReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";

import { AuthService } from "./auth.service";
import { GithubAuthService } from "./providers/github-auth.service";
import { LocalAuthService } from "./providers/local-auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let userModel: typeof User;

  const mockUserModel = {
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      username: "admin",
      email: "admin@admin.com",
      passwordIsValid: jest.fn(),
    }),
  };

  const mockLocalAuthService = {
    signIn: jest.fn().mockResolvedValue({
      accessToken: "accessToken",
      userId: 1,
      username: "admin",
      email: "admin@admin.com",
    }),
  };

  const mockGithubAuthService = {
    createNewUser: jest.fn().mockResolvedValue({
      accessToken: "accessToken",
      userId: 1,
      username: "admin",
      email: null,
    }),
    signIn: jest.fn().mockResolvedValue({
      accessToken: "accessToken",
      userId: 1,
      username: "admin",
      email: null,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: "secret",
          signOptions: { expiresIn: "60s" },
        }),
        ConfigModule,
      ],
      providers: [
        { provide: getModelToken(User), useValue: mockUserModel },
        AuthService,
        GithubAuthService,
        LocalAuthService,
      ],
    })
      .overrideProvider(LocalAuthService)
      .useValue(mockLocalAuthService)
      .overrideProvider(GithubAuthService)
      .useValue(mockGithubAuthService)
      .compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("signIn Local", () => {
    it("should throw UnauthorizedException if user does not exist", async () => {
      jest.spyOn(userModel, "findOne").mockResolvedValue(null);

      await expect(
        service.signIn({
          email: "admin",
          password: "password",
        }),
      ).rejects.toThrow("User or password incorrect");
    });

    it("should throw UnauthorizedException if user cannot sign with email and password", async () => {
      const mockUser = {
        canSignWithEmailAndPassword: false,
      };

      jest
        .spyOn(userModel, "findOne")
        .mockResolvedValue(mockUser as unknown as User);

      await expect(
        service.signIn({
          email: "admin",
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
          email: "admin@admin.com",
          password: "password",
        }),
      ).rejects.toThrow("User or password incorrect");
    });

    it("should return an object with accessToken, userId and username", async () => {
      const mockUser = {
        id: 1,
        username: "admin",
        email: "admin@admin.com",
        passwordIsValid: jest.fn().mockResolvedValue(true),
        canSignWithEmailAndPassword: true,
      };

      jest
        .spyOn(userModel, "findOne")
        .mockResolvedValue(mockUser as unknown as User);

      const response = await service.signIn({
        email: "admin@admin.com",
        password: "password",
      });

      expect(response).toEqual({
        accessToken: expect.any(String),
        userId: 1,
        username: "admin",
        email: "admin@admin.com",
      });
    });
  });

  describe("signInWithGithub", () => {
    it("should return an new user if user does not exist", async () => {
      jest.spyOn(userModel, "findOne").mockResolvedValue(null);

      const response = await service.signInWithGithub({
        user: {
          githubUserId: "awdawd",
          email: undefined,
          username: "admin",
        },
      } as GithubReqUser);

      expect(response).toEqual({
        accessToken: expect.any(String),
        userId: 1,
        username: "admin",
        email: null,
      });
    });

    it("should return an object with accessToken, userId and username", async () => {
      const mockUser = {
        id: 1,
        username: "admin",
        email: undefined,
      };

      jest
        .spyOn(userModel, "findOne")
        .mockResolvedValue(mockUser as unknown as User);

      const response = await service.signInWithGithub({
        user: {
          githubUserId: "1231",
          email: undefined,
          username: "admin",
        },
      } as GithubReqUser);

      expect(response).toEqual({
        accessToken: expect.any(String),
        userId: 1,
        username: "admin",
        email: null,
      });
    });
  });
});
