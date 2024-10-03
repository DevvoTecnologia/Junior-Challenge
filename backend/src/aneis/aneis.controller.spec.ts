import { Test, TestingModule } from '@nestjs/testing';
import { AneisController } from './aneis.controller';
import { AneisService } from './aneis.service';
import { Anel } from './anel.entity';

describe('AneisController', () => {
  let controller: AneisController;
  let service: AneisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AneisController],
      providers: [
        {
          provide: AneisService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([new Anel()]),
            findOne: jest.fn().mockResolvedValue(new Anel()),
            create: jest.fn().mockResolvedValue(new Anel()),
            update: jest.fn().mockResolvedValue(new Anel()),
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

  it('should return an array of aneis', async () => {
    expect(await controller.findAll()).toEqual([new Anel()]);
  });

  it('should return a single anel', async () => {
    expect(await controller.findOne(1)).toEqual(new Anel());
  });

  it('should create a new anel', async () => {
    const anel = new Anel();
    expect(await controller.create(anel)).toEqual(new Anel());
  });

  it('should update an anel', async () => {
    const anel = new Anel();
    expect(await controller.update(1, anel)).toEqual(new Anel());
  });

  it('should remove an anel', async () => {
    expect(await controller.remove(1)).toBeUndefined();
  });
});