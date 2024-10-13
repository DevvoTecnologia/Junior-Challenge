import { CacheModule } from "@nestjs/cache-manager";
import { JwtModule } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { cacheModuleOptions } from "src/global/constants";
import type { GithubReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";

import { GithubAuthService } from "./github-auth.service";

describe("GithubAuthService", () => {
  let service: GithubAuthService;
  let userModel: typeof User;

  const mockUserModel = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(cacheModuleOptions),
        JwtModule.register({
          secret: "secret",
          signOptions: { expiresIn: "1d" },
        }),
      ],
      providers: [
        { provide: getModelToken(User), useValue: mockUserModel },
        GithubAuthService,
      ],
    }).compile();

    service = module.get<GithubAuthService>(GithubAuthService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("userModel should be defined", () => {
    expect(userModel).toBeDefined();
  });

  describe("createNewUser", () => {
    it("should throw BadRequestEx with message 'Something went wrong creating the user'", async () => {
      const req = {
        user: {
          username: "admin",
          email: undefined,
          githubUserId: "123",
        },
      } as unknown as GithubReqUser;

      mockUserModel.create.mockRejectedValueOnce(new Error());

      await expect(service.createNewUser(req)).rejects.toThrow(
        "Something went wrong creating the user",
      );
    });

    it("should invalidate cache for users", async () => {
      const req = {
        user: {
          username: "admin",
          email: undefined,
          githubUserId: "123",
        },
      } as unknown as GithubReqUser;

      mockUserModel.create.mockResolvedValueOnce({
        id: 1,
        username: "admin",
        email: undefined,
        githubUserId: "123",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const delCacheSpyOn = jest.spyOn((service as any).cacheManager, "del");

      await service.createNewUser(req);

      expect(delCacheSpyOn).toHaveBeenCalledTimes(1);
    });

    it("should return an object with accessToken, userId, username and email", async () => {
      const req = {
        user: {
          username: "admin",
          email: undefined,
          githubUserId: "123",
        },
      } as unknown as GithubReqUser;

      mockUserModel.create.mockResolvedValueOnce({
        id: 1,
        username: "admin",
        email: undefined,
        githubUserId: "123",
      });

      const response = await service.createNewUser(req);

      expect(response).toEqual({
        accessToken: expect.any(String),
        userId: 1,
        username: "admin",
        email: undefined,
      });
    });
  });

  describe("signIn", () => {
    it("should call createNewUser when user is not found", async () => {
      const req = {
        user: {
          username: "admin",
          email: undefined,
          githubUserId: "123",
        },
      } as unknown as GithubReqUser;

      mockUserModel.findOne.mockResolvedValueOnce(null);
      mockUserModel.create.mockResolvedValueOnce({
        id: 1,
        username: "admin",
        email: undefined,
        githubUserId: "123",
      });

      const createNewUserSpyOn = jest.spyOn(service, "createNewUser");

      await service.signIn(req);

      expect(createNewUserSpyOn).toHaveBeenCalledTimes(1);
    });

    it("should return an object with accessToken, userId, username and email", async () => {
      const req = {
        user: {
          username: "admin",
          email: undefined,
          githubUserId: "123",
        },
      } as unknown as GithubReqUser;

      mockUserModel.findOne.mockResolvedValueOnce({
        id: 1,
        username: "admin",
        email: undefined,
        githubUserId: "123",
      });

      const response = await service.signIn(req);

      expect(response).toEqual({
        accessToken: expect.any(String),
        userId: 1,
        username: "admin",
        email: undefined,
      });
    });
  });
});
