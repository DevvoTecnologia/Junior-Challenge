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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { errorResponsePatternStructure } from "src/swagger.config";

import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { getProfileApiOkResponse, signInApiOkResponse } from "./swagger.config";

@Controller("auth")
@UsePipes(ValidationPipe)
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse(signInApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
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
  @ApiOkResponse(getProfileApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  getProfile(
    @Request()
    req: {
      user: {
        sub: number;
        username: string;
      };
    },
  ): {
    sub: number;
    username: string;
  } {
    return {
      sub: req.user.sub,
      username: req.user.username,
    };
  }
}
