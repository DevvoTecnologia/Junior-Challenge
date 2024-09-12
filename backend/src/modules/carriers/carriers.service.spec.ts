import { Test, TestingModule } from '@nestjs/testing';
import { CarriersService } from './carriers.service';

describe('CarriersService', () => {
  let service: CarriersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarriersService],
    }).compile();

    service = module.get<CarriersService>(CarriersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
