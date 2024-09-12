import { Controller } from '@nestjs/common';
import { ForgersService } from './forgers.service';

@Controller('forgers')
export class ForgersController {
  constructor(private readonly forgersService: ForgersService) {}
}
