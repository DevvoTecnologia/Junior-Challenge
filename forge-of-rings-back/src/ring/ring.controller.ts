import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRingDTO } from './dto/create-ring.dto';
import { RingService } from './ring.service';
import { UpdateRingDTO } from './dto/update-ring.dto';

@Controller('rings')
export class RingController {

  constructor(private readonly ringService: RingService) { }

  @Get()
  async list() {
    return await this.ringService.list();
  }

  @Get('/:ringId')
  async findById(@Param('ringId') ringId: string) {
    return this.ringService.findById(ringId);
  }

  @Post()
  async create(@Body() createRingDTO: CreateRingDTO) {
    await this.ringService.create(createRingDTO);
  }

  @Put('/:ringId')
  async update(@Param('ringId') ringId: string, @Body() updateRingDTO: UpdateRingDTO) {
    await this.ringService.update(ringId, updateRingDTO);
  }

  @Delete('/:ringId')
  async remove(@Param('ringId') ringId: string) {
    await this.ringService.remove(ringId);
  }

}
