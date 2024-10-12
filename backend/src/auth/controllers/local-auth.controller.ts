import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
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
import { errorResponsePatternStructure } from "src/global/swagger.config";
import type { ReqUser } from "src/global/types";

import { AuthDto } from "../dto/auth.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { LocalAuthService } from "../providers/local-auth.service";
import type { SignInResponse } from "../types/SignIn";
import {
  getProfileApiOkResponse,
  signInApiOkResponse,
} from "../utils/swagger.config";

@Controller("auth")
@UsePipes(ValidationPipe)
@ApiTags("Auth")
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse(signInApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async signIn(@Body() authDto: AuthDto): Promise<SignInResponse> {
    return await this.localAuthService.signIn(authDto);
  }

  // 💡 This route is protected by the AuthGuard
  @Get("test")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  @ApiOkResponse(getProfileApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  getProfile(@Req() req: ReqUser): ReqUser["user"] {
    return req.user;
  }
}
