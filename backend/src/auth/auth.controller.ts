import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async signIn(@Body() authDto: AuthDto): Promise<any> {
    return await this.authService.signIn(authDto);
  }
}
