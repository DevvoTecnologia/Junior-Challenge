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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { ReqAuthUser } from "./types/Req";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User")
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
    @Body(ValidationPipe) reateUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.create(reateUserDto);
  }

  @Put(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Req()
    req: ReqAuthUser,
  ): Promise<User> {
    return await this.userService.update(id, createUserDto, req);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: ReqAuthUser,
  ): Promise<void> {
    return await this.userService.delete(id, req);
  }
}
