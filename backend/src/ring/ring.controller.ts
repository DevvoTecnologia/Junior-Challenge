import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
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
  @UseInterceptors(FileInterceptor("image"))
  create(
    @Body(ValidationPipe) createRingDto: CreateRingDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|png/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024,
        })
        .build(),
    )
    file: Express.Multer.File,
  ): Promise<Ring> {
    return this.ringService.create(createRingDto, file);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("image"))
  update(
    @Body(ValidationPipe) updateRingDto: UpdateRingDto,
    @Param("id") id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|png/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024, // 1MB,
        })
        .build(),
    )
    file: Express.Multer.File,
  ): Promise<Ring> {
    return this.ringService.update(id, updateRingDto, file);
  }

  @Delete(":id")
  delete(@Param("id") id: number): Promise<null> {
    return this.ringService.delete(id);
  }
}
