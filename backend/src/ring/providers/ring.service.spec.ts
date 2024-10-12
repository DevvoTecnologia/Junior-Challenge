import { CacheModule } from "@nestjs/cache-manager";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getModelToken } from "@nestjs/sequelize";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as fs from "fs";
import * as sharp from "sharp";
import type { ReqUser } from "src/global/types";

import { RingService } from "./ring.service";
import type { CreateRingDto } from "../dto/create-ring.dto";
import type { UpdateRingDto } from "../dto/update-ring.dto";
import { Ring } from "../entities/ring.entity";

describe("RingService", () => {
  let service: RingService;
  let ringModel: typeof Ring;

  const jpegBuffer = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43,
    0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
    0x09, 0x08, 0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12,
    0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20,
    0x24, 0x2e, 0x27, 0x20, 0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29,
    0x2c, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1f, 0x27,
  ]);

  const imageMock = {
    fieldname: "image",
    originalname: "asd.jpg",
    encoding: "7bit",
    mimetype: "image/jpeg",
    buffer: jpegBuffer,
    size: 186761,
  } as Express.Multer.File;

  const mockRingModelFind = {
    id: 7,
    name: "Narya, the Ring of Fire",
    power: "The ring of Narya is set with a red ruby.",
    owner: "Gandalf",
    forgedBy: "Elfos",
    image: "ad35fcfe-08d0-42d7-b3ae-2f7ae67deb96-1727497797763-asd.jpg",
    createdAt: "2024-09-28T04:29:57.000Z",
    updatedAt: "2024-09-28T04:29:57.000Z",
    userId: 4,
    url: "http://localhost:3000/uploads/ad35fcfe-08d0-42d7-b3ae-2f7ae67deb96-1727497797763-asd.jpg",
  };

  const mockRingModelCreateAndUpdate = {
    id: 7,
    name: "Narya, the Ring of Fire",
    power: "The ring of Narya is set with a red ruby.",
    owner: "Gandalf",
    forgedBy: "Elfos",
    image: "ad35fcfe-08d0-42d7-b3ae-2f7ae67deb96-1727497797763-asd.jpg",
    userId: 4,
    updatedAt: "2024-09-28T04:29:57.766Z",
    createdAt: "2024-09-28T04:29:57.766Z",
    url: "http://localhost:3000/uploads/ad35fcfe-08d0-42d7-b3ae-2f7ae67deb96-1727497797763-asd.jpg",
    save: jest.fn(),
  };

  const mockRingModel = {
    findAll: jest.fn().mockResolvedValue([mockRingModelFind]),
    create: jest.fn().mockResolvedValue(mockRingModelCreateAndUpdate),
    update: jest.fn().mockResolvedValue(mockRingModelCreateAndUpdate),
    delete: jest.fn().mockResolvedValue(null),
    findOne: jest.fn().mockResolvedValue(mockRingModelFind),
    count: jest.fn().mockResolvedValue(0),
  };

  beforeAll(() => {
    jest.spyOn(sharp.prototype, "metadata").mockResolvedValue({
      width: 100,
      height: 100,
      format: "jpeg",
    });
  });

  beforeEach(async () => {
    jest.spyOn(fs, "writeFileSync").mockReturnValue(undefined);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        CacheModule.register({
          ttl: 60000 * 10, // 10 minutes
        }),
      ],
      providers: [
        RingService,
        { provide: getModelToken(Ring), useValue: mockRingModel },
      ],
    }).compile();

    service = module.get<RingService>(RingService);
    ringModel = module.get<typeof Ring>(getModelToken(Ring));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of rings", async () => {
      const rings = await service.findAll({ user: { sub: 4 } } as ReqUser);

      expect(rings).toEqual([mockRingModelFind]);
    });

    it("should throw an error if no rings are found", async () => {
      jest.spyOn(ringModel, "findAll").mockResolvedValue([]);

      await expect(
        service.findAll({ user: { sub: 4 } } as ReqUser),
      ).rejects.toThrow(new NotFoundException("No rings found"));
    });

    it("should throw error from cache if no rings are found", async () => {
      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn((service as any).cacheManager, "get")
        .mockResolvedValue([]);

      await expect(
        service.findAll({ user: { sub: 4 } } as ReqUser),
      ).rejects.toThrow(new NotFoundException("No rings found"));
    });

    it("should return rings from cache", async () => {
      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn((service as any).cacheManager, "get")
        .mockResolvedValue([mockRingModelFind]);

      const rings = await service.findAll({ user: { sub: 4 } } as ReqUser);

      expect(rings).toEqual([mockRingModelFind]);
    });
  });

  describe("findOne", () => {
    it("should return a ring", async () => {
      const ring = await service.findOne(7, {
        user: { sub: 4 },
      } as ReqUser);

      expect(ring).toEqual(mockRingModelFind);
    });

    it("should throw NotFoundEx if the ring is not found", async () => {
      jest.spyOn(ringModel, "findOne").mockResolvedValue(null);

      await expect(
        service.findOne(7, { user: { sub: 4 } } as ReqUser),
      ).rejects.toThrow(new NotFoundException("Ring with id 7 not found"));
    });

    it("should throw error from cache if the ring is not found", async () => {
      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn((service as any).cacheManager, "get")
        .mockResolvedValue("NotFound");

      await expect(
        service.findOne(7, { user: { sub: 4 } } as ReqUser),
      ).rejects.toThrow(new NotFoundException("Ring with id 7 not found"));
    });

    it("should return ring from cache", async () => {
      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn((service as any).cacheManager, "get")
        .mockResolvedValue(mockRingModelFind);

      const ring = await service.findOne(7, {
        user: { sub: 4 },
      } as ReqUser);

      expect(ring).toEqual(mockRingModelFind);
    });
  });

  describe("create", () => {
    it("should throw BadRequestEx if all fields are not filled", async () => {
      const createRingDto = {
        name: "  ",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(new BadRequestException("All fields are required"));
    });
    it("should throw BadRequestEx if is not a valid forgedBy ring", async () => {
      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "INVALIDO",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException("Invalid forgedBy value: INVALIDO"),
      );
    });

    it("should create a new ring", async () => {
      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      const ring = await service.create(
        createRingDto as CreateRingDto,
        imageMock,
        {
          user: { sub: 4 },
        } as ReqUser,
      );

      expect(ring).toEqual(mockRingModelCreateAndUpdate);
    });

    it("should invalidate cache after creating a new ring", async () => {
      const cacheManagerDelSpy = jest.spyOn(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (service as any).cacheManager,
        "del",
      );

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await service.create(createRingDto as CreateRingDto, imageMock, {
        user: { sub: 4 },
      } as ReqUser);

      expect(cacheManagerDelSpy).toHaveBeenCalledTimes(3);
    });

    it("should throw BadRequestEx if an error occurs in database", async () => {
      jest.spyOn(ringModel, "create").mockRejectedValue(new Error());

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(new BadRequestException("Error creating ring"));
    });
  });

  describe("update", () => {
    describe("provide but empty fields", () => {
      it("should throw BadRequestEx if the name provided is empty", async () => {
        const updateRingDto = {
          name: "  ",
          power: "The ring of",
          owner: "Galadriel",
          forgedBy: "Elfos",
        };

        await expect(
          service.update(7, updateRingDto as UpdateRingDto, imageMock, {
            user: { sub: 4 },
          } as ReqUser),
        ).rejects.toThrow(
          new BadRequestException("Name if provided must not be empty"),
        );
      });

      it("should throw BadRequestEx if the power provided is empty", async () => {
        const updateRingDto = {
          name: "Nenya, the Ring of Water",
          power: "  ",
          owner: "Galadriel",
          forgedBy: "Elfos",
        };

        await expect(
          service.update(7, updateRingDto as UpdateRingDto, imageMock, {
            user: { sub: 4 },
          } as ReqUser),
        ).rejects.toThrow(
          new BadRequestException("Power if provided must not be empty"),
        );
      });

      it("should throw BadRequestEx if the owner provided is empty", async () => {
        const updateRingDto = {
          name: "Nenya, the Ring of Water",
          power: "The ring of Nenya is set with a white stone.",
          owner: "  ",
          forgedBy: "Elfos",
        };

        await expect(
          service.update(7, updateRingDto as UpdateRingDto, imageMock, {
            user: { sub: 4 },
          } as ReqUser),
        ).rejects.toThrow(
          new BadRequestException("Owner if provided must not be empty"),
        );
      });

      it("should throw BadRequestEx if the forgedBy provided is empty", async () => {
        const updateRingDto = {
          name: "Nenya, the Ring of Water",
          power: "The ring of Nenya is set with a white stone.",
          owner: "Galadriel",
          forgedBy: "  ",
        };

        await expect(
          service.update(7, updateRingDto as UpdateRingDto, imageMock, {
            user: { sub: 4 },
          } as ReqUser),
        ).rejects.toThrow(
          new BadRequestException("ForgedBy if provided must not be empty"),
        );
      });
    });

    it("should throw BadRequestEx if is not a valid forgedBy ring", async () => {
      const updateRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "INVALIDO",
      };

      await expect(
        service.update(7, updateRingDto as UpdateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException("Invalid forgedBy value: INVALIDO"),
      );
    });

    it("should invalidate cache after updating a ring", async () => {
      const cacheManagerDelSpy = jest.spyOn(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (service as any).cacheManager,
        "del",
      );

      jest
        .spyOn(ringModel, "findOne")
        .mockResolvedValue(mockRingModelCreateAndUpdate as unknown as Ring);

      const updateRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await service.update(7, updateRingDto as UpdateRingDto, imageMock, {
        user: { sub: 4 },
      } as ReqUser);

      expect(cacheManagerDelSpy).toHaveBeenCalledTimes(4);
    });

    it("should throw NotFoundEx if the ring is not found", async () => {
      jest.spyOn(ringModel, "findOne").mockResolvedValue(null);

      const updateRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await expect(
        service.update(7, updateRingDto as UpdateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(new NotFoundException("Ring with id 7 not found"));
    });

    it("should update a ring", async () => {
      jest
        .spyOn(ringModel, "findOne")
        .mockResolvedValue(mockRingModelCreateAndUpdate as unknown as Ring);

      const updateRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      const updatedRing = await service.update(
        7,
        updateRingDto as UpdateRingDto,
        imageMock,
        {
          user: { sub: 4 },
        } as ReqUser,
      );

      expect(updatedRing).toEqual(mockRingModelCreateAndUpdate);
    });

    it("should not update fields that are not passed", async () => {
      jest
        .spyOn(ringModel, "findOne")
        .mockResolvedValue(mockRingModelCreateAndUpdate as unknown as Ring);

      const updateRingDto = {};

      const updatedRing = await service.update(
        7,
        updateRingDto as UpdateRingDto,
        imageMock,
        {
          user: { sub: 4 },
        } as ReqUser,
      );

      expect(updatedRing).toEqual(mockRingModelCreateAndUpdate);
    });
  });

  describe("delete", () => {
    const ring = {
      ...mockRingModelCreateAndUpdate,
      destroy: jest.fn(),
    } as unknown as Ring;

    it("should throw NotFoundEx if the ring is not found", async () => {
      jest.spyOn(ringModel, "findOne").mockResolvedValue(null);

      await expect(
        service.delete(7, { user: { sub: 4 } } as ReqUser),
      ).rejects.toThrow(new NotFoundException("Ring with id 7 not found"));
    });

    it("should invalidate cache after deleting a ring", async () => {
      const cacheManagerDelSpy = jest.spyOn(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (service as any).cacheManager,
        "del",
      );

      jest.spyOn(ringModel, "findOne").mockResolvedValue(ring);

      await service.delete(7, { user: { sub: 4 } } as ReqUser);

      expect(cacheManagerDelSpy).toHaveBeenCalledTimes(4);
    });

    it("should delete a ring", async () => {
      jest.spyOn(ringModel, "findOne").mockResolvedValue(ring);

      await service.delete(7, { user: { sub: 4 } } as ReqUser);

      expect(ring.destroy).toHaveBeenCalled();
    });

    it("should delete the ring image", async () => {
      jest.spyOn(ringModel, "findOne").mockResolvedValue(ring);

      jest.spyOn(fs, "existsSync").mockReturnValue(true);

      const fsSpyOn = jest.spyOn(fs, "unlinkSync").mockReturnValue(undefined);

      await service.delete(7, { user: { sub: 4 } } as ReqUser);

      expect(fsSpyOn).toHaveBeenCalled();
    });
  });

  describe("validateRingCreation", () => {
    it("should throw BadRequestEx if the user has already forged 3 Elfos rings", async () => {
      jest.spyOn(ringModel, "count").mockResolvedValue(3);

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException(`Elfos can't forge more than 3 rings`),
      );
    });

    it("should throw BadRequestEx if the user has already forged 7 Anões rings", async () => {
      jest.spyOn(ringModel, "count").mockResolvedValue(7);

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Anões",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException(`Anões can't forge more than 7 rings`),
      );
    });

    it("should throw BadRequestEx if the user has already forged 9 Homens rings", async () => {
      jest.spyOn(ringModel, "count").mockResolvedValue(9);

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Homens",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException(`Homens can't forge more than 9 rings`),
      );
    });

    it("should throw BadRequestEx if the user has already forged 1 Sauron ring", async () => {
      jest.spyOn(ringModel, "count").mockResolvedValue(1);

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Sauron",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException(`Sauron can't forge more than 1 ring`),
      );
    });

    it("should not validate forgedBy limit if ring is being updated and forgedBy dont change", async () => {
      jest
        .spyOn(ringModel, "findOne")
        .mockResolvedValue(mockRingModelCreateAndUpdate as unknown as Ring);

      const updateRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      const updatedRing = await service.update(
        7,
        updateRingDto as UpdateRingDto,
        imageMock,
        {
          user: { sub: 4 },
        } as ReqUser,
      );

      expect(updatedRing).toEqual(mockRingModelCreateAndUpdate);
    });

    it("should validate forgedBy limit if ring is being updated and forgedBy change", async () => {
      jest
        .spyOn(ringModel, "findOne")
        .mockResolvedValue(mockRingModelCreateAndUpdate as unknown as Ring);

      jest.spyOn(ringModel, "count").mockResolvedValue(1);

      const updateRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Sauron",
      };

      await expect(
        service.update(7, updateRingDto as UpdateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException(`Sauron can't forge more than 1 ring`),
      );
    });

    it("should create folder uploads if it does not exist", async () => {
      jest
        .spyOn(ringModel, "create")
        .mockResolvedValue(mockRingModelCreateAndUpdate);

      jest.spyOn(fs, "existsSync").mockReturnValue(false);

      const fsSpyOn = jest.spyOn(fs, "mkdirSync").mockReturnValue(undefined);

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await service.create(createRingDto as CreateRingDto, imageMock, {
        user: { sub: 4 },
      } as ReqUser);

      expect(fsSpyOn).toHaveBeenCalled();
    });

    it("should throw BadRequestEx if is not a valid image type", async () => {
      const invalidBuffer = Buffer.from([0x00, 0x00, 0x00, 0x00]);

      const invalidImageMock = {
        ...imageMock,
        buffer: invalidBuffer,
      };

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, invalidImageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException(
          "Validation failed (expected type is /jpeg|png/)",
        ),
      );
    });

    it("should throw BadRequestEx if an error occurs in image validation with sharp", async () => {
      jest.spyOn(sharp.prototype, "metadata").mockRejectedValue(new Error());

      const createRingDto = {
        name: "Nenya, the Ring of Water",
        power: "The ring of Nenya is set with a white stone.",
        owner: "Galadriel",
        forgedBy: "Elfos",
      };

      await expect(
        service.create(createRingDto as CreateRingDto, imageMock, {
          user: { sub: 4 },
        } as ReqUser),
      ).rejects.toThrow(
        new BadRequestException(
          "Validation failed (expected type is /jpeg|png/)",
        ),
      );
    });
  });
});
