import { CacheInterceptor } from "@nestjs/cache-manager";
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
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ReqAuthUser } from "./types/Req";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User")
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(":id")
  async findByPk(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findByPk(id);
  }

  @Post()
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<Pick<User, "id" | "username">> {
    return await this.userService.create(createUserDto);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @Req()
    req: ReqAuthUser,
  ): Promise<Pick<User, "id" | "username">> {
    return await this.userService.update(id, updateUserDto, req);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  async delete(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) deleteUserDto: DeleteUserDto,
    @Req() req: ReqAuthUser,
  ): Promise<null> {
    return await this.userService.delete(id, deleteUserDto, req);
  }
}
