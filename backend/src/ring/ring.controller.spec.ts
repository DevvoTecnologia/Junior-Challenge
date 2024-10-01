import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { RingController } from "./ring.controller";
import { RingService } from "./ring.service";
import type { ReqAuthUser } from "./types/Req";

describe("RingController", () => {
  let controller: RingController;

  const mockRingServiceFindAll = {
    id: 7,
    name: "Narya, the Ring of Fire",
    power: "The ring of Narya is set with a red ruby.",
    owner: "Gandalf",
    forgedBy: "Elfos",
    image: "ad35fcfe-08d0-42d7-b3ae-2f7ae67deb96-1727497797763-asd.jpg",
    createdAt: "2024-09-28T04:29:57.000Z",
    updatedAt: "2024-09-28T04:29:57.000Z",
    userId: 4,
  };

  const mockRingServiceCreateAndUpdate = {
    id: 7,
    name: "Narya, the Ring of Fire",
    power: "The ring of Narya is set with a red ruby.",
    owner: "Gandalf",
    forgedBy: "Elfos",
    image: "ad35fcfe-08d0-42d7-b3ae-2f7ae67deb96-1727497797763-asd.jpg",
    userId: 4,
    updatedAt: "2024-09-28T04:29:57.766Z",
    createdAt: "2024-09-28T04:29:57.766Z",
    url: "http://192.168.100.3:3000/uploads/ad35fcfe-08d0-42d7-b3ae-2f7ae67deb96-1727497797763-asd.jpg",
  };

  const mockRingService = {
    findAll: jest.fn(() => [mockRingServiceFindAll]),
    findOne: jest.fn(() => mockRingServiceFindAll),
    create: jest.fn(() => mockRingServiceCreateAndUpdate),
    update: jest.fn(() => mockRingServiceCreateAndUpdate),
    delete: jest.fn(() => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      controllers: [RingController],
      providers: [RingService],
    })
      .overrideProvider(RingService)
      .useValue(mockRingService)
      .compile();

    controller = module.get<RingController>(RingController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of rings", async () => {
      expect(await controller.findAll({} as ReqAuthUser)).toEqual([
        mockRingServiceFindAll,
      ]);
    });
  });

  describe("findOne", () => {
    it("should return a ring", async () => {
      expect(await controller.findOne(7, {} as ReqAuthUser)).toEqual(
        mockRingServiceFindAll,
      );
    });
  });

  describe("create", () => {
    it("should create a ring", async () => {
      expect(
        await controller.create(
          {
            name: "Narya, the Ring of Fire",
            power: "The ring of Narya is set with a red ruby.",
            owner: "Gandalf",
            forgedBy: "Elfos",
          },
          {} as Express.Multer.File,
          {} as ReqAuthUser,
        ),
      ).toEqual(mockRingServiceCreateAndUpdate);
    });
  });

  describe("update", () => {
    it("should update a ring", async () => {
      expect(
        await controller.update(
          {
            name: "Narya, the Ring of Fire",
            power: "The ring of Narya is set with a red ruby.",
            owner: "Gandalf",
            forgedBy: "Elfos",
          },
          7,
          {} as Express.Multer.File,
          {} as ReqAuthUser,
        ),
      ).toEqual(mockRingServiceCreateAndUpdate);
    });
  });

  describe("delete", () => {
    it("should delete a ring", async () => {
      expect(await controller.delete(7, {} as ReqAuthUser)).toBeNull();
    });
  });
});
