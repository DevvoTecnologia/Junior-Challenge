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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { fileValidation } from "src/global/constants";
import { errorResponsePatternStructure } from "src/global/swagger.config";
import type { ReqUser } from "src/global/types";

import { CreateRingDto } from "../dto/create-ring.dto";
import { UpdateRingDto } from "../dto/update-ring.dto";
import { Ring } from "../entities/ring.entity";
import { RingService } from "../providers/ring.service";
import {
  createApiBody,
  createApiOkResponse,
  findAllApiOkResponse,
  findOneApiOkResponse,
  updateApiBody,
  updateApiOkResponse,
} from "../utils/swagger.config";

@Controller("ring")
@UseGuards(JwtAuthGuard)
@ApiTags("Ring")
@ApiBearerAuth("defaultBearerAuth")
export class RingController {
  constructor(private readonly ringService: RingService) {}

  @Get()
  @ApiOkResponse(findAllApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async findAll(@Req() req: ReqUser): Promise<Ring[]> {
    return await this.ringService.findAll(req);
  }

  @Get(":id")
  @ApiOkResponse(findOneApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: ReqUser,
  ): Promise<Ring> {
    return await this.ringService.findOne(id, req);
  }

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes("multipart/form-data")
  @ApiBody(createApiBody)
  @ApiCreatedResponse(createApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async create(
    @Body(ValidationPipe) createRingDto: CreateRingDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: fileValidation.image.allowedTypes,
        })
        .addMaxSizeValidator(fileValidation.image.size)
        .build(),
    )
    file: Express.Multer.File,
    @Req() req: ReqUser,
  ): Promise<Ring> {
    const ring = await this.ringService.create(createRingDto, file, req);
    return ring;
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes("multipart/form-data")
  @ApiBody(updateApiBody)
  @ApiOkResponse(updateApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async update(
    @Body(ValidationPipe) updateRingDto: UpdateRingDto,
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: fileValidation.image.allowedTypes,
        })
        .addMaxSizeValidator(fileValidation.image.size)
        .build({ fileIsRequired: false }),
    )
    file: Express.Multer.File | undefined,
    @Req() req: ReqUser,
  ): Promise<Ring> {
    const ring = await this.ringService.update(id, updateRingDto, file, req);
    return ring;
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "No body returned for response",
  })
  @ApiResponse(errorResponsePatternStructure)
  async delete(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: ReqUser,
  ): Promise<null> {
    const ring = await this.ringService.delete(id, req);
    return ring;
  }
}
