import { Test, TestingModule } from '@nestjs/testing';
import { CarriersRepository } from '../carriers.repository';
import { CarriersService } from '../carriers.service';
import { CustomException } from './../../../utils/CustomException';

describe('CarriersService', () => {
  let service: CarriersService;

  const mockCarriersRepository = {
    createACarrier: jest.fn(),
    getCarrierById: jest.fn(),
    getCarrierByName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarriersService],
      providers: [
        {
          provide: CarriersRepository,
          useValue: mockCarriersRepository,
        },
      ],
    }).compile();

    service = module.get<CarriersService>(CarriersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the carrier by id', async () => {
    const body = {
      carrier_id: 1,
      carrier_name: 'Bilbo',
      created_at: '2024-09-12T17:39:02.738Z',
      updated_at: '2024-09-12T17:39:02.738Z',
      deleted_at: null,
    };
    jest.spyOn(mockCarriersRepository, 'getCarrierById').mockReturnValue(body);

    const response = await service.getCarrierById(1);
    expect(response).toEqual(body);
  });

  it('should return a custom exception', async () => {
    try {
      jest
        .spyOn(mockCarriersRepository, 'getCarrierById')
        .mockReturnValue(null);

      await service.getCarrierById(1);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });

  it('should return the carrier by name', async () => {
    const body = {
      carrier_id: 1,
      carrier_name: 'Bilbo',
      created_at: '2024-09-12T17:39:02.738Z',
      updated_at: '2024-09-12T17:39:02.738Z',
      deleted_at: null,
    };
    jest
      .spyOn(mockCarriersRepository, 'getCarrierByName')
      .mockReturnValue(body);

    const response = await service.getCarrierByName('Bilbo');
    expect(response).toEqual(body);
  });

  it('should return a custom exception', async () => {
    try {
      jest
        .spyOn(mockCarriersRepository, 'getCarrierByName')
        .mockReturnValue(null);

      await service.getCarrierByName('Bilbo');
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });

  it('should create a carrier', async () => {
    const body = {
      carrier_name: 'Bilbo',
    };
    jest.spyOn(mockCarriersRepository, 'createACarrier').mockReturnValue(body);

    const response = await service.createACarrier('Bilbo');

    expect(response).toEqual(body);
  });
});
