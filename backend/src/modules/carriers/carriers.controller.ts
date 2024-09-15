import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/utils/Validation/ValidationPipe';
import { carrierSchema, createCarrierDTO } from './carrier.dto';
import { CarriersService } from './carriers.service';

@Controller('carriers')
export class CarriersController {
  constructor(private readonly carriersService: CarriersService) {}

  @Post()
  @UsePipes(new ValidationPipe(carrierSchema))
  async createAForger(@Body() data: createCarrierDTO) {
    return await this.carriersService.createACarrier(data.carrier_name);
  }

  @Get(':id')
  async showACarrier(@Param('id') id: string) {
    return await this.carriersService.showACarrier(Number(id));
  }

  @Get()
  async listCarriers() {
    return await this.carriersService.listCarriers();
  }

  @Patch(':id')
  async updateACarrier(@Param('id') id: string, @Body() data: createCarrierDTO) {
    return await this.carriersService.updateACarrier(Number(id), data);
  }

  @Delete(':id')
  async deleteACarrier(@Param('id') id: string) {
    return await this.carriersService.deleteACarrier(Number(id));
  }
}
