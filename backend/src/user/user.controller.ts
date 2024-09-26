import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Controller("user")
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

  @UseGuards(AuthGuard)
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, createUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.userService.delete(id);
  }
}
