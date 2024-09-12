import { Test, TestingModule } from '@nestjs/testing';
import { RingService } from './rings.service';

describe('RingService', () => {
  let service: RingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RingService],
    }).compile();

    service = module.get<RingService>(RingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
