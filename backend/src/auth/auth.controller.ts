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
import { errorResponsePatternStructure } from "src/global/swagger.config";
import type { ReqUser } from "src/global/types";

import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { GithubAuthGuard } from "./github-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { getProfileApiOkResponse, signInApiOkResponse } from "./swagger.config";
import type { SignInResponse } from "./types/SignIn";

@Controller("auth")
@UsePipes(ValidationPipe)
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse(signInApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  async signIn(@Body() authDto: AuthDto): Promise<SignInResponse> {
    return await this.authService.signIn(authDto);
  }

  @Get("github")
  @UseGuards(GithubAuthGuard)
  githubSignIn(): void {
    return void 0;
  }

  @Get("github/callback")
  @UseGuards(GithubAuthGuard)
  async githubSignInCallback(
    @Request() req: ReqUser,
  ): Promise<ReqUser["user"]> {
    return req.user;
  }

  // 💡 This route is protected by the AuthGuard
  @Get("test")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("defaultBearerAuth")
  @ApiOkResponse(getProfileApiOkResponse)
  @ApiResponse(errorResponsePatternStructure)
  getProfile(@Request() req: ReqUser): ReqUser["user"] {
    return req.user;
  }
}
