import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';

import { Request } from 'express';

import { AccessTokenGuard } from './guards/accessToken.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ResponseAuth } from './interface/auth.interface';

@Controller('login')
export class AuthController {
  private logger: Logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() data: AuthDto): Promise<ResponseAuth> {
    this.logger.log('login');
    return this.authService.login(data);
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  async logout(@Req() req: Request): Promise<void> {
    await this.authService.logout(req.user['sub']);
  }

  @Post('refresh-tokens')
  @UseGuards(AccessTokenGuard)
  async refreshTokens(@Req() req: Request): Promise<ResponseAuth> {
    return this.authService.refreshTokens(
      req.user['sub'],
      req.headers['refresh_token'] as string,
    );
  }
};