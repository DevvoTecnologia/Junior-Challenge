import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";
import { RingService } from "./ring.service";
import { ReqAuthUser } from "./types/Req";

@Controller("ring")
@UseGuards(AuthGuard)
@ApiTags("Ring")
@ApiBearerAuth("defaultBearerAuth")
export class RingController {
  constructor(private readonly ringService: RingService) {}

  @Get()
  async findAll(@Req() req: ReqAuthUser): Promise<Ring[]> {
    return await this.ringService.findAll(req);
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: ReqAuthUser,
  ): Promise<Ring> {
    return await this.ringService.findOne(id, req);
  }

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Update ring with image",
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        power: {
          type: "string",
        },
        owner: {
          type: "string",
        },
        forgedBy: {
          type: "string",
          examples: ["Elfos", "Anões", "Homens", "Sauron"],
        },
        image: {
          type: "imageFile",
          format: "binary",
        },
      },
    },
  })
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
    @Req() req: ReqAuthUser,
  ): Promise<Ring> {
    return await this.ringService.create(createRingDto, file, req);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "Update ring with image",
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        power: {
          type: "string",
        },
        owner: {
          type: "string",
        },
        forgedBy: {
          type: "string",
          examples: ["Elfos", "Anões", "Homens", "Sauron"],
        },
        image: {
          type: "imageFile",
          format: "binary",
        },
      },
    },
  })
  async update(
    @Body(ValidationPipe) updateRingDto: UpdateRingDto,
    @Param("id", ParseIntPipe) id: number,
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
    @Req() req: ReqAuthUser,
  ): Promise<Ring> {
    return await this.ringService.update(id, updateRingDto, file, req);
  }

  @Delete(":id")
  async delete(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: ReqAuthUser,
  ): Promise<null> {
    return await this.ringService.delete(id, req);
  }
}
