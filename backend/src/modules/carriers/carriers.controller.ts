import { Controller } from '@nestjs/common';
import { CarriersService } from './carriers.service';

@Controller('carriers')
export class CarriersController {
  constructor(private readonly carriersService: CarriersService) {}
}
