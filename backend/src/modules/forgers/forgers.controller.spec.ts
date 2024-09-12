import { Test, TestingModule } from '@nestjs/testing';
import { ForgersController } from './forgers.controller';
import { ForgersService } from './forgers.service';

describe('ForgersController', () => {
  let controller: ForgersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForgersController],
      providers: [ForgersService],
    }).compile();

    controller = module.get<ForgersController>(ForgersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
