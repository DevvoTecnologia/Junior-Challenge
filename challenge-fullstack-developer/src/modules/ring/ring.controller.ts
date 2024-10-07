import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from '../Auth/guards/accessToken.guard';

import { RingService } from './ring.service';
import { RingDto } from './dto/ring.dto';
import { ResponseRing } from './interface/responseRing.interface';

@Controller('ring')
export class RingController {
  private logger: Logger = new Logger(RingController.name);

  constructor(private ringService: RingService) { }

  @Get()
  @UseGuards(AccessTokenGuard)
  async getRings(): Promise<ResponseRing> {
    this.logger.log("GET rings");

    return this.ringService.getAllRings();
  };

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async findRingById(@Param('id', ParseIntPipe) id: number): Promise<ResponseRing> {
    this.logger.log(`Finding ring with id: ${id}`);

    return this.ringService.getByIdRing(id);
  };

  @Post()
  @UseGuards(AccessTokenGuard)
  async createNewRing(@Body() ringDto: RingDto): Promise<void> {
    this.logger.log('Creating new ring');

    await this.ringService.createRing(ringDto);
  };

  @Put(':id')
  @UseGuards(AccessTokenGuard)
  async updateActualRing(@Param('id', ParseIntPipe) idRing: number, @Body() ringDto: RingDto): Promise<void> {
    this.logger.log('Updating actual ring');

    await this.ringService.updateRing(idRing, ringDto);
  };

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async deleteActualRing(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.log('Deleting ring');

    await this.ringService.deleteRing(id);
  };
};