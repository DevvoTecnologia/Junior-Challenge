import { Test, TestingModule } from '@nestjs/testing';
import { CarriersController } from './carriers.controller';
import { CarriersService } from './carriers.service';

describe('CarriersController', () => {
  let controller: CarriersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarriersController],
      providers: [CarriersService],
    }).compile();

    controller = module.get<CarriersController>(CarriersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
