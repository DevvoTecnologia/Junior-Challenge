import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/utils/Validation/ValidationPipe';
import { createForgerDTO, forgerSchema } from './forger.dto';
import { ForgersService } from './forgers.service';

@Controller('forgers')
export class ForgersController {
  constructor(private readonly forgersService: ForgersService) {}

  @Post()
  @UsePipes(new ValidationPipe(forgerSchema))
  async createAForger(@Body() data: createForgerDTO) {
    return await this.forgersService.createAForger({name: data.forger_name, max_forge: data.forger_max_forge});
  }

  @Get(':id')
  async showAForger(@Param('id') id: string) {
    return await this.forgersService.showAForger(Number(id));
  }

  @Get()
  async listForgers() {
    return await this.forgersService.listForgers();
  }

  @Patch(':id')
  async updateAForger(@Param('id') id: string, @Body() data: createForgerDTO) {
    return await this.forgersService.updateAForger(Number(id), data);
  }

  @Delete(':id')
  async deleteAForger(@Param('id') id: string) {
    return await this.forgersService.deleteAForger(Number(id));
  }
}
