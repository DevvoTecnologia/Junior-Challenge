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
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";
import { RingService } from "./ring.service";

@Controller("ring")
@UseGuards(AuthGuard)
@ApiTags("Ring")
@ApiBearerAuth("access-token")
export class RingController {
  constructor(private readonly ringService: RingService) {}

  @Get()
  async findAll(): Promise<Ring[]> {
    return await this.ringService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async create(
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
    return await this.ringService.create(createRingDto, file);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("image"))
  async update(
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
    return await this.ringService.update(id, updateRingDto, file);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<null> {
    return await this.ringService.delete(id);
  }
}
