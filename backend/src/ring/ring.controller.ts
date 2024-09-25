import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";
import { RingService } from "./ring.service";

@Controller("ring")
@UsePipes(ValidationPipe)
export class RingController {
  constructor(private readonly ringService: RingService) {}

  @Get()
  findAll(): Promise<Ring[]> {
    return this.ringService.findAll();
  }

  @Post()
  create(@Body() createRingDto: CreateRingDto): Promise<Ring> {
    return this.ringService.create(createRingDto);
  }

  @Put(":id")
  update(
    @Body() updateRingDto: UpdateRingDto,
    @Param("id") id: number,
  ): Promise<Ring> {
    return this.ringService.update(id, updateRingDto);
  }

  @Delete(":id")
  delete(@Param("id") id: number): Promise<null> {
    return this.ringService.delete(id);
  }
}
