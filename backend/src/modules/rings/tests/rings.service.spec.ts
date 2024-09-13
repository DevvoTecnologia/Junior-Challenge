import { Test, TestingModule } from '@nestjs/testing';
import { RingsRepository } from '../rings.repository';
import { RingsService } from '../rings.service';
import { CustomException } from './../../../utils/CustomException';
import { CarriersService } from './../../carriers/carriers.service';
import { ForgersService } from './../../forgers/forgers.service';

describe('RingsService', () => {
  let service: RingsService;

  const mockRingsRepository = {
    showARing: jest.fn(),
    createARing: jest.fn(),
    updateARing: jest.fn(),
    listRingsByForge: jest.fn(),
  };

  const mockForgersService = {
    getForgerById: jest.fn(),
  };

  const mockCarriersService = {
    getCarrierById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RingsService],
      providers: [
        {
          provide: RingsRepository,
          useValue: mockRingsRepository,
        },
        {
          provide: CarriersService,
          useValue: mockCarriersService,
        },
        {
          provide: ForgersService,
          useValue: mockForgersService,
        },
      ],
    }).compile();

    service = module.get<RingsService>(RingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the forger by id', async () => {
    const ring = {
      ring_id: 1,
      ring_name: 'aaa',
      ring_image: 'bbbbbbb',
      ring_power: 'cccc',
      created_at: new Date(),
      updated_at: '2024-09-12T22:21:15.429Z',
      deleted_at: null,
    };

    const carrier = {
      carrier_id: 1,
      carrier_name: 'Bilbo',
      created_at: '2024-09-12T17:39:02.738Z',
      updated_at: '2024-09-12T17:39:02.738Z',
      deleted_at: null,
    };

    const forger = {
      forger_id: 1,
      forger_name: 'Homens',
      forger_max_forge: 9,
      created_at: '2024-09-12T17:38:52.620Z',
      updated_at: '2024-09-12T17:38:52.620Z',
      deleted_at: null,
    };
    const body = {
      ...ring,
      carrier,
      forger,
    };

    jest.spyOn(mockRingsRepository, 'showARing').mockReturnValue(body);
    jest.spyOn(mockCarriersService, 'getCarrierById').mockReturnValue(carrier);
    jest.spyOn(mockForgersService, 'getForgerById').mockReturnValue(forger);

    const response = await service.showARing(1);
    expect(response).toEqual(body);
  });

  it('should return a custom exception', async () => {
    try {
      const ring = {
        ring_name: 'sdfsdf',
        ring_image: 'sdfsdfsdf',
        ring_power: 'gfdgdfg',
        forger_id: 1,
        carrier_id: 1,
      };

      const carrier = {
        carrier_id: 1,
        carrier_name: 'Bilbo',
        created_at: '2024-09-12T17:39:02.738Z',
        updated_at: '2024-09-12T17:39:02.738Z',
        deleted_at: null,
      };

      const forger = {
        forger_id: 1,
        forger_name: 'Homens',
        forger_max_forge: 1,
        created_at: '2024-09-12T17:38:52.620Z',
        updated_at: '2024-09-12T17:38:52.620Z',
        deleted_at: null,
      };

      const body = {
        ...ring,
        carrier,
        forger,
      };

      jest
        .spyOn(mockCarriersService, 'getCarrierById')
        .mockReturnValue(carrier);
      jest
        .spyOn(mockRingsRepository, 'listRingsByForge')
        .mockReturnValue(['1', '2']);
      jest.spyOn(mockForgersService, 'getForgerById').mockReturnValue(forger);
      await service.createARing(body);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });

  it('should return the created ring', async () => {
    const ring = {
      ring_name: 'sdfsdf',
      ring_image: 'sdfsdfsdf',
      ring_power: 'gfdgdfg',
      forger_id: 1,
      carrier_id: 1,
    };

    const carrier = {
      carrier_id: 1,
      carrier_name: 'Bilbo',
      created_at: '2024-09-12T17:39:02.738Z',
      updated_at: '2024-09-12T17:39:02.738Z',
      deleted_at: null,
    };

    const forger = {
      forger_id: 1,
      forger_name: 'Homens',
      forger_max_forge: 3,
      created_at: '2024-09-12T17:38:52.620Z',
      updated_at: '2024-09-12T17:38:52.620Z',
      deleted_at: null,
    };

    const body = {
      ...ring,
      carrier,
      forger,
    };

    jest.spyOn(mockCarriersService, 'getCarrierById').mockReturnValue(carrier);
    jest
      .spyOn(mockRingsRepository, 'listRingsByForge')
      .mockReturnValue(['1', '2']);
    jest.spyOn(mockForgersService, 'getForgerById').mockReturnValue(forger);
    jest.spyOn(mockRingsRepository, 'createARing').mockReturnValue(body);
    const response = await service.createARing(ring);
    expect(response).toEqual(body);
  });
});
