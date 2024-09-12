import { Test, TestingModule } from '@nestjs/testing';
import { ForgersService } from './forgers.service';

describe('ForgersService', () => {
  let service: ForgersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForgersService],
    }).compile();

    service = module.get<ForgersService>(ForgersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
