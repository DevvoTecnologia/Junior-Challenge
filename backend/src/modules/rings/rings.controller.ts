import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/utils/Validation/ValidationPipe';
import { createRingDTO, ringSchema } from './ring.dto';
import { RingService } from './rings.service';

@Controller('ring')
export class RingController {
  constructor(private readonly ringService: RingService) {}

  @Post()
  @UsePipes(new ValidationPipe(ringSchema))
  async createARing(@Body() data: createRingDTO) {
    return await this.ringService.createARing(data);
  }

  @Get(':id')
  async showARing(@Param('id') id: string) {
    return await this.ringService.showARing(Number(id));
  }

  @Get()
  async listRings() {
    return await this.ringService.listRings();
  }

  @Patch(':id')
  async updateARing(@Param('id') id: string, @Body() data: createRingDTO) {
    return await this.ringService.updateARing(Number(id), data);
  }

  @Delete(':id')
  async deleteARing(@Param('id') id: string) {
    return await this.ringService.deleteARing(Number(id));
  }
}
