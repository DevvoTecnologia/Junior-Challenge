import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async signIn(@Body() authDto: AuthDto): Promise<{
    accessToken: string;
  }> {
    return await this.authService.signIn(authDto);
  }

  // 💡 This route is protected by the AuthGuard
  @UseGuards(AuthGuard)
  @Get("test")
  getProfile(@Request() req: { user: unknown }): unknown {
    return req.user;
  }
}
