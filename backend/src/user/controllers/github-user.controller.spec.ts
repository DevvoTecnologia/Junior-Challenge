import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { ReqUser } from "src/global/types";

import { GithubUserController } from "./github-user.controller";
import { GithubUserService } from "../providers/github-user.service";

describe("GithubUserController", () => {
  let controller: GithubUserController;

  const mockUserService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: jest.fn((id, updateUserDto, req) => {
      return { id, username: updateUserDto.username, email: null };
    }),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: jest.fn((param, req) => {
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubUserController],
      providers: [GithubUserService],
    })
      .overrideProvider(GithubUserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<GithubUserController>(GithubUserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("update", () => {
    it("update should return a user", async () => {
      const updateUserDto = {
        username: "test",
      };
      const req = {
        user: {
          sub: 1,
          username: "test",
          email: "",
        },
      } as ReqUser;

      expect(await controller.update(1, updateUserDto, req)).toEqual({
        id: 1,
        username: updateUserDto.username,
        email: null,
      });
    });
  });

  describe("delete", () => {
    it("delete should return null", async () => {
      const req = {
        user: {
          sub: 1,
          username: "test",
          email: "",
        },
      } as ReqUser;

      expect(
        await controller.delete(
          1,
          {
            confirm: true,
          },
          req,
        ),
      ).toBeNull();
    });
  });
});
