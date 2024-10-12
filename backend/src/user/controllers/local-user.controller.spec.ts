import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { ReqUser } from "src/global/types";

import { LocalUserController } from "./local-user.controller";
import type { CreateUserDto } from "../dto/create-user.dto";
import { LocalUserService } from "../providers/local-user.service";

describe("LocalUserController", () => {
  let controller: LocalUserController;

  const userMock = {
    id: 1,
    username: "as",
    email: "admin@admin.com",
    rings: [
      {
        id: 1,
        name: "one",
        power: "one",
        owner: "one",
        forgedBy: "one",
      },
    ],
  };

  const mockUserService = {
    findAll: jest.fn(() => [userMock]),
    findByPk: jest.fn((value) => {
      if (typeof parseInt(value, 10) === "number") {
        return userMock;
      }
    }),
    create: jest.fn((createUserDto: CreateUserDto) => {
      return { id: 1, username: createUserDto.username };
    }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: jest.fn((id, updateUserDto, req) => {
      return { id, username: updateUserDto.username };
    }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: jest.fn((param, req) => {
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalUserController],
      providers: [LocalUserService],
    })
      .overrideProvider(LocalUserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<LocalUserController>(LocalUserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("findAll should return an array of users", async () => {
      expect(await controller.findAll()).toEqual([userMock]);
    });
  });

  describe("findOne", () => {
    it("findByPk should return a user", async () => {
      expect(await controller.findByPk(1)).toEqual(userMock);
    });
  });

  describe("create", () => {
    it("create should return a user", async () => {
      const createUserDto = {
        username: "test",
        email: "test@test.com",
        password: "test",
      };
      expect(await controller.create(createUserDto)).toEqual({
        id: 1,
        username: createUserDto.username,
      });
    });
  });

  describe("update", () => {
    it("update should return a user", async () => {
      const updateUserDto = {
        username: "test",
        password: "test",
      };
      const req = {
        user: {
          sub: 1,
          username: "test",
        },
      } as ReqUser;

      expect(await controller.update(1, updateUserDto, req)).toEqual({
        id: 1,
        username: updateUserDto.username,
      });
    });
  });

  describe("delete", () => {
    it("delete should return null", async () => {
      const req = {
        user: {
          sub: 1,
          username: "test",
        },
      } as ReqUser;

      expect(
        await controller.delete(
          1,
          {
            password: "test",
          },
          req,
        ),
      ).toBeNull();
    });
  });
});
