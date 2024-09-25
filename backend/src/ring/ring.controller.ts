import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { CreateRingDto } from "./dto/create-ring.dto";
import { Ring } from "./entities/ring.entity";
import { RingService } from "./ring.service";

@Controller("ring")
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
    @Body() updateRingDto: CreateRingDto,
    @Param("id") id: number,
  ): Promise<Ring> {
    return this.ringService.update(id, updateRingDto);
  }

  @Delete(":id")
  delete(@Param("id") id: number): Promise<null> {
    return this.ringService.delete(id);
  }
}
