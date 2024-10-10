import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as fs from "fs";
import * as path from "path";
import type { ReqUser } from "src/global/types";
import { Ring } from "src/ring/entities/ring.entity";

import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
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
      imports: [ConfigModule],
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should throw an NotFoundException if no users are found", async () => {
      jest.spyOn(userModel, "findAll").mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(
        new NotFoundException("No users found"),
      );
    });

    it("should return an array of users", async () => {
      jest.spyOn(userModel, "findAll").mockResolvedValue([
        {
          id: 1,
          username: "test",
          rings: [
            {
              id: 1,
              name: "test",
              image: "test",
              url: "undefined/uploads/test",
            },
          ],
        } as User,
      ]);

      expect(await service.findAll()).toEqual([
        {
          id: 1,
          username: "test",
          rings: [
            {
              id: 1,
              name: "test",
              image: "test",
              url: "undefined/uploads/test",
            },
          ],
        } as User,
      ]);
    });
  });

  describe("findByPk", () => {
    it("should throw an NotFoundException if no user is found", async () => {
      await expect(service.findByPk(1)).rejects.toThrow(
        new NotFoundException("User with id 1 not found"),
      );
    });

    it("should return a user", async () => {
      jest.spyOn(userModel, "findByPk").mockResolvedValue({
        id: 1,
        username: "test",
        rings: [
          {
            id: 1,
            name: "test",
            image: "test",
            url: "undefined/uploads/test",
          },
        ],
      } as User);

      expect(await service.findByPk(1)).toEqual({
        id: 1,
        username: "test",
        rings: [
          {
            id: 1,
            name: "test",
            image: "test",
            url: "undefined/uploads/test",
          },
        ],
      });
    });
  });

  describe("findOne", () => {
    it("should throw an NotFoundException if no user is found", async () => {
      await expect(service.findOne("test")).rejects.toThrow(
        new NotFoundException("User with username test not found"),
      );
    });

    it("should return a user", async () => {
      jest.spyOn(userModel, "findOne").mockResolvedValue({
        id: 1,
        username: "test",
        rings: [
          {
            id: 1,
            name: "test",
            image: "test",
            url: "undefined/uploads/test",
          },
        ],
      } as User);

      expect(await service.findOne("test")).toEqual({
        id: 1,
        username: "test",
        rings: [
          {
            id: 1,
            name: "test",
            image: "test",
            url: "undefined/uploads/test",
          },
        ],
      });
    });
  });

  describe("create", () => {
    it("should throw an BadRequestException if the username already exists", async () => {
      jest.spyOn(userModel, "create").mockRejectedValue(new Error());

      await expect(
        service.create({ username: "test", password: "test" }),
      ).rejects.toThrow(new NotFoundException("Username already exists"));
    });

    it("should return a user", async () => {
      jest.spyOn(userModel, "create").mockResolvedValue({
        id: 1,
        username: "test",
      } as User);

      expect(
        await service.create({ username: "test", password: "test" }),
      ).toEqual({
        id: 1,
        username: "test",
      });
    });
  });

  describe("update", () => {
    it("should throw an BadRequestException if the user is not the same as the authenticated user", async () => {
      await expect(
        service.update(
          1,
          { username: "test", password: "test", newPassword: "" },
          {
            user: { sub: 2 },
          } as ReqUser,
        ),
      ).rejects.toThrow(new NotFoundException("You can not update this user"));
    });

    it("should throw an NotFoundException if no user is found", async () => {
      await expect(
        service.update(
          1,
          { username: "test", password: "test", newPassword: "" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).rejects.toThrow(new NotFoundException("User with id 1 not found"));
    });

    it("should throw an BadRequestEx if new password.length < 4", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(true),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      await expect(
        service.update(
          1,
          { username: "test", password: "test", newPassword: "123" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).rejects.toThrow(
        new BadRequestException("Password must be at least 4 characters long"),
      );

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).not.toHaveBeenCalled();
    });

    it("should throw an BadRequestEx if new password.length > 255", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(true),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      await expect(
        service.update(
          1,
          {
            username: "test",
            password: "test",
            newPassword: "a".repeat(256),
          },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).rejects.toThrow(
        new BadRequestException("Password must be at most 255 characters long"),
      );

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).not.toHaveBeenCalled();
    });

    it("should throw an BadRequestException if the username already exists", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn().mockRejectedValue(new Error()),
        passwordIsValid: jest.fn().mockResolvedValue(true),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      await expect(
        service.update(
          1,
          { username: "test", password: "test", newPassword: "" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).rejects.toThrow(new BadRequestException("Username already exists"));

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).toHaveBeenCalled();
    });

    it("should throw an BadRequestException if the password is passed and is invalid", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(false),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      await expect(
        service.update(
          1,
          { username: "test", password: "test", newPassword: "" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).rejects.toThrow(new BadRequestException("Invalid password"));

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).not.toHaveBeenCalled();
    });

    it("should throw an BadRequestException if the password is not passed", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn(),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      await expect(
        service.update(1, { username: "test", password: "", newPassword: "" }, {
          user: { sub: 1 },
        } as ReqUser),
      ).rejects.toThrow(new BadRequestException("Password is required"));

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).not.toHaveBeenCalled();
    });

    it("should throw an BadRequestException if the new password is the same as the old one", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(true),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      await expect(
        service.update(
          1,
          { username: "test", password: "test", newPassword: "test" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).rejects.toThrow(
        new BadRequestException(
          "New password can not be the same as the old one",
        ),
      );

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).not.toHaveBeenCalled();
    });

    it("should update the user password with newPassword", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(true),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      expect(
        await service.update(
          1,
          { username: "test", password: "test", newPassword: "newTest" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).toEqual({
        id: 1,
        username: "test",
      });

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).toHaveBeenCalled();
    });

    it("should update the user with current username if no username is provided", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(true),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      expect(
        await service.update(
          1,
          { username: "", password: "test", newPassword: "" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).toEqual({
        id: 1,
        username: "test",
      });

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).toHaveBeenCalled();
    });

    it("should return a user", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(true),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      expect(
        await service.update(
          1,
          { username: "test", password: "test", newPassword: "" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).toEqual({
        id: 1,
        username: "test",
      });

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).toHaveBeenCalled();
    });

    test("if username|password is not provided, it should not update the user", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(true),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      expect(
        await service.update(
          1,
          { username: "test", password: "test", newPassword: "" },
          {
            user: { sub: 1 },
          } as ReqUser,
        ),
      ).toEqual({
        id: 1,
        username: "test",
      });

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
    });
  });

  describe("delete", () => {
    it("should throw an BadRequestException if the user is not the same as the authenticated user", async () => {
      await expect(
        service.delete(1, { password: "test" }, {
          user: { sub: 2 },
        } as ReqUser),
      ).rejects.toThrow(new NotFoundException("You can not delete this user"));
    });

    it("should throw an NotFoundException if no user is found", async () => {
      await expect(
        service.delete(1, { password: "test" }, {
          user: { sub: 1 },
        } as ReqUser),
      ).rejects.toThrow(new NotFoundException("User with id 1 not found"));
    });

    it("should throw an BadRequestException if the password is passed and is invalid", async () => {
      const user = {
        id: 1,
        destroy: jest.fn(),
        passwordIsValid: jest.fn().mockResolvedValue(false),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      await expect(
        service.delete(1, { password: "test" }, {
          user: { sub: 1 },
        } as ReqUser),
      ).rejects.toThrow(new BadRequestException("Invalid password"));

      expect(findByPkSpyOn).toHaveBeenCalledWith(1, {
        include: [{ attributes: ["id", "image"], model: Ring }],
      });
      expect(user.destroy).not.toHaveBeenCalled();
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
        passwordIsValid: jest.fn().mockResolvedValue(true),
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
        await service.delete(1, { password: "test" }, {
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
  });
});
