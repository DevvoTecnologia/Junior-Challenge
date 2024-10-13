import { CacheModule } from "@nestjs/cache-manager";
import { NotFoundException } from "@nestjs/common";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as fs from "fs";
import * as path from "path";
import { cacheModuleOptions } from "src/global/constants";
import type { ReqUser } from "src/global/types";
import { Ring } from "src/ring/entities/ring.entity";

import { GithubUserService } from "./github-user.service";
import { User } from "../entities/user.entity";

describe("GithubUserService", () => {
  let service: GithubUserService;
  let userModel: typeof User;

  const mockUserService = {
    findAll: jest.fn(() => []),
    findByPk: jest.fn(() => null),
    findOne: jest.fn(() => null),
    create: jest.fn(() => null),
    destroy: jest.fn(() => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register(cacheModuleOptions)],
      providers: [
        GithubUserService,
        {
          provide: getModelToken(User),
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<GithubUserService>(GithubUserService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("update", () => {
    it("should throw an BadRequestException if the user is not the same as the authenticated user", async () => {
      await expect(
        service.update(1, { username: "test" }, {
          user: { sub: 2 },
        } as ReqUser),
      ).rejects.toThrow(new NotFoundException("You can not update this user"));
    });

    it("should throw an NotFoundException if no user is found", async () => {
      await expect(
        service.update(1, { username: "test" }, {
          user: { sub: 1 },
        } as ReqUser),
      ).rejects.toThrow(new NotFoundException("User is not a Github user"));
    });

    it("should update the user with current username if no username is provided", async () => {
      const user = {
        id: 1,
        username: "test",
        email: null,
        password: null,
        save: jest.fn(),
        githubUserId: "1651651651",
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      expect(
        await service.update(1, { username: "" }, {
          user: { sub: 1 },
        } as ReqUser),
      ).toEqual({
        id: 1,
        username: "test",
        email: null,
      });

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).toHaveBeenCalled();
    });

    it("should return a user", async () => {
      const user = {
        id: 1,
        username: "test",
        email: null,
        password: null,
        save: jest.fn(),
        githubUserId: "1651651651",
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      expect(
        await service.update(1, { username: "test" }, {
          user: { sub: 1 },
        } as ReqUser),
      ).toEqual({
        id: 1,
        username: "test",
        email: null,
      });

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).toHaveBeenCalled();
    });

    it("should invalidate cache when updating a user", async () => {
      const user = {
        id: 1,
        username: "test",
        email: null,
        password: null,
        save: jest.fn(),
        githubUserId: "1651651651",
      } as unknown as User;

      jest.spyOn(userModel, "findByPk").mockResolvedValue(user);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const delSpyOn = jest.spyOn((service as any).cacheManager, "del");

      expect(
        await service.update(1, { username: "test" }, {
          user: { sub: 1 },
        } as ReqUser),
      ).toEqual({
        id: 1,
        username: "test",
        email: null,
      });

      expect(delSpyOn).toHaveBeenCalledTimes(2);
      expect(delSpyOn).toHaveBeenCalledWith("users");
      expect(delSpyOn).toHaveBeenCalledWith("user_1");
    });
  });

  describe("delete", () => {
    it("should throw an BadRequestException if the user is not the same as the authenticated user", async () => {
      await expect(
        service.delete(1, { confirm: true }, {
          user: { sub: 2 },
        } as ReqUser),
      ).rejects.toThrow(new NotFoundException("You can not delete this user"));
    });

    it("should throw an BadRequestException if the user does not confirm the deletion", async () => {
      await expect(
        service.delete(1, { confirm: false }, {
          user: { sub: 1 },
        } as ReqUser),
      ).rejects.toThrow(new NotFoundException("You must confirm the deletion"));
    });

    it("should throw an NotFoundException if no user is found", async () => {
      await expect(
        service.delete(1, { confirm: true }, {
          user: { sub: 1 },
        } as ReqUser),
      ).rejects.toThrow(new NotFoundException("User is not a Github user"));
    });

    it("should not delete the ring image if it does not exist", async () => {
      const imageName = "testImage.jpg";
      const filePath = path.join(process.cwd(), "uploads", imageName);

      jest.spyOn(fs, "existsSync").mockReturnValue(false);
      const unlinkSyncSpy = jest.spyOn(fs, "unlinkSync").mockImplementation();

      await service["deleteRingImage"](imageName);

      expect(fs.existsSync).toHaveBeenCalledWith(filePath);
      expect(unlinkSyncSpy).not.toHaveBeenCalled();
    });

    it("should delete the ring image if it exists", async () => {
      const imageName = "testImage.jpg";
      const filePath = path.join(process.cwd(), "uploads", imageName);

      jest.spyOn(fs, "existsSync").mockReturnValue(true);
      const unlinkSyncSpy = jest.spyOn(fs, "unlinkSync").mockImplementation();

      await service["deleteRingImage"](imageName);

      expect(fs.existsSync).toHaveBeenCalledWith(filePath);
      expect(unlinkSyncSpy).toHaveBeenCalledWith(filePath);
    });

    it("should delete a user and delete all rings associated", async () => {
      const user = {
        id: 1,
        destroy: jest.fn(),
        githubUserId: "1651651651",
        rings: [
          {
            id: 1,
            image: "test",
          },
          {
            id: 2,
            image: "test2",
          },
        ],
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      const deleteRingImageSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(service as any, "deleteRingImage")
        .mockResolvedValue(void 0);

      expect(
        await service.delete(1, { confirm: true }, {
          user: { sub: 1 },
        } as ReqUser),
      ).toBeNull();

      expect(findByPkSpyOn).toHaveBeenCalledWith(1, {
        include: [{ attributes: ["id", "image"], model: Ring }],
      });
      expect(user.destroy).toHaveBeenCalled();

      expect(deleteRingImageSpy).toHaveBeenCalledTimes(2);
      expect(deleteRingImageSpy).toHaveBeenCalledWith("test");
      expect(deleteRingImageSpy).toHaveBeenCalledWith("test2");
    });

    it("should invalidate cache when deleting a user", async () => {
      const user = {
        id: 1,
        destroy: jest.fn(),
        githubUserId: "1651651651",
        rings: [],
      } as unknown as User;

      jest.spyOn(userModel, "findByPk").mockResolvedValue(user);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const delSpyOn = jest.spyOn((service as any).cacheManager, "del");

      expect(
        await service.delete(1, { confirm: true }, {
          user: { sub: 1 },
        } as ReqUser),
      ).toBeNull();

      expect(delSpyOn).toHaveBeenCalledTimes(2);
      expect(delSpyOn).toHaveBeenCalledWith("users");
      expect(delSpyOn).toHaveBeenCalledWith("user_1");
    });
  });
});
