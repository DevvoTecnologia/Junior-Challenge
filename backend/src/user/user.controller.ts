import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { errorResponsePatternStructure } from "src/global/swagger.config";
import type { ReqUser } from "src/global/types";

import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import {
  createApiOkResponse,
  findAllApiOkResponse,
  findOneApiOkResponse,
  updateApiOkResponse,
} from "./swagger.config";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse(findAllApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(":id")
  @ApiOkResponse(findOneApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async findByPk(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findByPk(id);
  }

  @Post()
  @ApiCreatedResponse(createApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<Pick<User, "id" | "username">> {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  @ApiOkResponse(updateApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Req()
    req: ReqUser,
  ): Promise<Pick<User, "id" | "username">> {
    const user = await this.userService.update(id, updateUserDto, req);
    return user;
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  @ApiOkResponse({
    description: "No body returned for response",
  })
  @ApiResponse(errorResponsePatternStructure)
  async delete(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) deleteUserDto: DeleteUserDto,
    @Req() req: ReqUser,
  ): Promise<null> {
    const user = await this.userService.delete(id, deleteUserDto, req);
    return user;
  }
}
