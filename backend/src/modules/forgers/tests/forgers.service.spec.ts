import { Test, TestingModule } from '@nestjs/testing';
import { CustomException } from '../../../utils/CustomException';
import { ForgersRepository } from '../forgers.repository';
import { ForgersService } from '../forgers.service';

describe('ForgersService', () => {
  let service: ForgersService;

  const mockForgersRepository = {
    getForgerById: jest.fn(),
    getForgerByName: jest.fn(),
    createAForger: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForgersService],
      providers: [
        {
          provide: ForgersRepository,
          useValue: mockForgersRepository,
        },
      ],
    }).compile();

    service = module.get<ForgersService>(ForgersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the forger by id', async () => {
    const body = {
      forger_id: 1,
      forger_name: 'Anões',
      forger_max_forge: 7,
      created_at: '2024-09-12T17:38:52.620Z',
      updated_at: '2024-09-12T17:38:52.620Z',
      deleted_at: null,
    };
    jest.spyOn(mockForgersRepository, 'getForgerById').mockReturnValue(body);

    const response = await service.getForgerById(1);
    expect(response).toEqual(body);
  });

  it('should return a custom exception', async () => {
    try {
      jest.spyOn(mockForgersRepository, 'getForgerById').mockReturnValue(null);

      await service.getForgerById(1);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });

  it('should return the forger by name', async () => {
    const body = {
      forger_id: 1,
      forger_name: 'Anões',
      forger_max_forge: 7,
      created_at: '2024-09-12T17:38:52.620Z',
      updated_at: '2024-09-12T17:38:52.620Z',
      deleted_at: null,
    };
    jest.spyOn(mockForgersRepository, 'getForgerByName').mockReturnValue(body);

    const response = await service.getForgerByName('Anões');
    expect(response).toEqual(body);
  });

  it('should return a custom exception', async () => {
    try {
      jest
        .spyOn(mockForgersRepository, 'getForgerByName')
        .mockReturnValue(null);

      await service.getForgerByName('Anões');
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });

  it('should create a forger', async () => {
    const body = {
      forger_id: 2,
      forger_name: 'Anões',
      forger_max_forge: 7,
      created_at: '2024-09-12T17:38:52.620Z',
      updated_at: '2024-09-12T17:38:52.620Z',
      deleted_at: null,
    };
    jest.spyOn(mockForgersRepository, 'createAForger').mockReturnValue(body);

    const response = await service.createAForger({
      name: 'Anões',
      max_forge: 7,
    });

    expect(response).toEqual(body);
  });
});
