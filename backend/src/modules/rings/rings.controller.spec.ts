import { Test, TestingModule } from '@nestjs/testing';
import { RingController } from './rings.controller';
import { RingService } from './rings.service';

describe('RingController', () => {
  let controller: RingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RingController],
      providers: [RingService],
    }).compile();

    controller = module.get<RingController>(RingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
