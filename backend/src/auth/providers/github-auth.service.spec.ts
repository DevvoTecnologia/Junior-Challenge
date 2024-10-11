import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { GithubReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";

import { GithubAuthService } from "./github-auth.service";

describe("GithubAuthService", () => {
  let service: GithubAuthService;
  let userModel: typeof User;

  const mockUserModel = {
    create: jest.fn().mockResolvedValue({
      id: 1,
      username: "admin",
      email: null,
      githubUserId: "123",
    }),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue("accessToken"),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getModelToken(User), useValue: mockUserModel },
        GithubAuthService,
        JwtService,
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

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
    it("should return a SignInResponse", async () => {
      const req = {
        user: {
          username: "admin",
          email: null,
          githubUserId: "123",
        },
        res: {
          redirect: jest.fn(),
        },
      } as unknown as GithubReqUser;

      const result = await service.createNewUser(req);

      expect(result).toEqual({
        accessToken: "accessToken",
        userId: 1,
        username: "admin",
        email: null,
      });
    });

    it("should throw BadRequestEx if something goes wrong creating the user", async () => {
      const req = {
        user: {
          username: "admin",
          email: null,
          githubUserId: "123",
        },
        res: {
          redirect: jest.fn(),
        },
      } as unknown as GithubReqUser;

      mockUserModel.create.mockRejectedValueOnce(new Error());

      await expect(service.createNewUser(req)).rejects.toThrow(
        "Something went wrong creating the user",
      );
    });

    it("should redirect to the clientUrl", async () => {
      const req = {
        user: {
          username: "admin",
          email: null,
          githubUserId: "123",
        },
        res: {
          redirect: jest.fn(),
        },
      } as unknown as GithubReqUser;

      await service.createNewUser(req);

      expect(req.res?.redirect).toHaveBeenCalledWith(
        "http://localhost:3001/users",
      );
    });

    it("should create a new user", async () => {
      const req = {
        user: {
          username: "admin",
          email: null,
          githubUserId: "123",
        },
        res: {
          redirect: jest.fn(),
        },
      } as unknown as GithubReqUser;

      await service.createNewUser(req);

      expect(mockUserModel.create).toHaveBeenCalledWith({
        username: "admin",
        email: null,
        githubUserId: "123",
        canSignWithEmailAndPassword: false,
      });
    });
  });

  describe("signIn", () => {
    it("should return a SignInResponse", async () => {
      const user = {
        id: 1,
        username: "admin",
        email: null,
      } as unknown as User;

      const req = {
        user: {
          username: "admin",
          email: null,
          githubUserId: "123",
        },
        res: {
          redirect: jest.fn(),
        },
      } as unknown as GithubReqUser;

      const result = await service.signIn(user, req);

      expect(result).toEqual({
        accessToken: "accessToken",
        userId: 1,
        username: "admin",
        email: null,
      });
    });
  });
});
