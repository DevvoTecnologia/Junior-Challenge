import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { User } from "./entities/user.entity";
import type { ReqAuthUser } from "./types/Req";
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
        } as User,
      ]);

      expect(await service.findAll()).toEqual([
        {
          id: 1,
          username: "test",
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
      } as User);

      expect(await service.findByPk(1)).toEqual({
        id: 1,
        username: "test",
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
      } as User);

      expect(await service.findOne("test")).toEqual({
        id: 1,
        username: "test",
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
          } as ReqAuthUser,
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
          } as ReqAuthUser,
        ),
      ).rejects.toThrow(new NotFoundException("User with id 1 not found"));
    });

    it("should throw an BadRequestException if the username already exists", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn().mockRejectedValue(new Error()),
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
          } as ReqAuthUser,
        ),
      ).rejects.toThrow(new BadRequestException("Username already exists"));

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.save).toHaveBeenCalled();
    });

    it("should return a user", async () => {
      const user = {
        id: 1,
        username: "test",
        password: "test",
        save: jest.fn(),
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
          } as ReqAuthUser,
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
          } as ReqAuthUser,
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
        } as ReqAuthUser),
      ).rejects.toThrow(new NotFoundException("You can not delete this user"));
    });

    it("should throw an NotFoundException if no user is found", async () => {
      await expect(
        service.delete(1, { password: "test" }, {
          user: { sub: 1 },
        } as ReqAuthUser),
      ).rejects.toThrow(new NotFoundException("User with id 1 not found"));
    });

    it("should delete a user", async () => {
      const user = {
        id: 1,
        destroy: jest.fn(),
      } as unknown as User;

      const findByPkSpyOn = jest
        .spyOn(userModel, "findByPk")
        .mockResolvedValue(user);

      expect(
        await service.delete(1, { password: "test" }, {
          user: { sub: 1 },
        } as ReqAuthUser),
      ).toBeNull();

      expect(findByPkSpyOn).toHaveBeenCalledWith(1);
      expect(user.destroy).toHaveBeenCalled();
    });
  });
});
