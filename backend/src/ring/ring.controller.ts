import {
  Cache,
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
} from "@nestjs/cache-manager";
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { AuthGuard } from "src/auth/auth.guard";
import { errorResponsePatternStructure } from "src/swagger.config";

import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";
import { RingService } from "./ring.service";
import {
  createApiBody,
  createApiOkResponse,
  findAllApiOkResponse,
  findOneApiOkResponse,
  updateApiBody,
  updateApiOkResponse,
} from "./swagger.config";
import { ReqAuthUser } from "./types/Req";

@Controller("ring")
@UseGuards(AuthGuard)
@ApiTags("Ring")
@ApiBearerAuth("defaultBearerAuth")
export class RingController {
  constructor(
    private readonly ringService: RingService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey("rings")
  @ApiOkResponse(findAllApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async findAll(@Req() req: ReqAuthUser): Promise<Ring[]> {
    return await this.ringService.findAll(req);
  }

  @Get(":id")
  @ApiOkResponse(findOneApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: ReqAuthUser,
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
    const ring = await this.ringService.create(createRingDto, file, req);
    await this.cacheManager.del("rings");
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
          fileType: /jpeg|png/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024, // 1MB,
        })
        .build({ fileIsRequired: false }),
    )
    file: Express.Multer.File | undefined,
    @Req() req: ReqAuthUser,
  ): Promise<Ring> {
    const ring = await this.ringService.update(id, updateRingDto, file, req);
    await this.cacheManager.del("rings");
    return ring;
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "No body returned for response",
  })
  @ApiResponse(errorResponsePatternStructure)
  async delete(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: ReqAuthUser,
  ): Promise<null> {
    const ring = await this.ringService.delete(id, req);
    await this.cacheManager.del("rings");
    return ring;
  }
}
