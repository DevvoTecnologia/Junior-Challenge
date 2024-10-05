import { Test, TestingModule } from '@nestjs/testing';
import { AneisController } from './aneis.controller';
import { AneisService } from './aneis.service';
import { Anel } from './anel.entity';
import { NotFoundException } from '@nestjs/common';

describe('AneisController', () => {
  let controller: AneisController;
  let service: AneisService;

  const mockUser = { userId: 1 };
  const mockAnel = new Anel();
  mockAnel.id = 1;
  mockAnel.nome = 'Anel do Poder';
  mockAnel.user = { id: 1 } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AneisController],
      providers: [
        {
          provide: AneisService,
          useValue: {
            findAllByUser: jest.fn().mockResolvedValue([mockAnel]),
            findOneByUser: jest.fn().mockResolvedValue(mockAnel),
            create: jest.fn().mockResolvedValue(mockAnel),
            update: jest.fn().mockResolvedValue(mockAnel),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<AneisController>(AneisController);
    service = module.get<AneisService>(AneisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of aneis for the user', async () => {
      expect(await controller.findAll({ user: mockUser } as any)).toEqual([
        mockAnel,
      ]);
      expect(service.findAllByUser).toHaveBeenCalledWith(mockUser.userId);
    });
  });

  describe('findOne', () => {
    it('should return a single anel for the user', async () => {
      expect(await controller.findOne(1, { user: mockUser } as any)).toEqual(
        mockAnel,
      );
      expect(service.findOneByUser).toHaveBeenCalledWith(1, mockUser.userId);
    });

    it('should throw NotFoundException when anel is not found', async () => {
      jest
        .spyOn(service, 'findOneByUser')
        .mockRejectedValue(new NotFoundException());
      await expect(
        controller.findOne(999, { user: mockUser } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new anel for the user', async () => {
      const createAnelDto = {
        nome: 'Novo Anel',
        poder: 'Invisibilidade',
        portador: 'Frodo',
        forjadoPor: 'Elfos',
        imagem: 'url',
      };
      expect(
        await controller.create(createAnelDto, { user: mockUser } as any),
      ).toEqual(mockAnel);
      expect(service.create).toHaveBeenCalledWith(
        createAnelDto,
        mockUser.userId,
      );
    });
  });

  describe('update', () => {
    it('should update an anel for the user', async () => {
      const updateAnelDto = { nome: 'Anel Atualizado' };
      expect(
        await controller.update(1, updateAnelDto, { user: mockUser } as any),
      ).toEqual(mockAnel);
      expect(service.update).toHaveBeenCalledWith(
        1,
        updateAnelDto,
        mockUser.userId,
      );
    });

    it('should throw NotFoundException when anel is not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
      await expect(
        controller.update(999, {}, { user: mockUser } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an anel for the user', async () => {
      expect(
        await controller.remove(1, { user: mockUser } as any),
      ).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1, mockUser.userId);
    });

    it('should throw NotFoundException when anel is not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
      await expect(
        controller.remove(999, { user: mockUser } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
