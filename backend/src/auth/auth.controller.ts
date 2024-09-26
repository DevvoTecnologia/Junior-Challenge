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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
@UsePipes(ValidationPipe)
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() authDto: AuthDto): Promise<{
    accessToken: string;
    userId: number;
    username: string;
  }> {
    return await this.authService.signIn(authDto);
  }

  // 💡 This route is protected by the AuthGuard
  @Get("test")
  @UseGuards(AuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  getProfile(@Request() req: { user: unknown }): unknown {
    return req.user;
  }
}
