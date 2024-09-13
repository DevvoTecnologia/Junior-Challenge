import {
  Body,
  Controller,
  Delete,
  Logger,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';

import { Request } from 'express';

import { AccessTokenGuard } from '../Auth/guards/accessToken.guard';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('register')
export class UserController {
  private logger: Logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<void> {
    this.logger.log("Creating user");
    return this.userService.createNewUser(userDto);
  }

  @Put()
  @UseGuards(AccessTokenGuard)
  async updateUser(@Req() req: Request, @Body() userDto: UserDto): Promise<void> {
    const id = req.user['sub'];
    this.logger.log(`Updating member with id: ${id}`);
    return this.userService.updateActualUser(userDto, id);
  }

  @Delete()
  @UseGuards(AccessTokenGuard)
  async deleteMember(@Req() req: Request): Promise<void> {
    const id = req.user['sub'];
    this.logger.log(`Deleting member with id: ${id}`);
    return this.userService.deleteActualUser(id);
  }
};