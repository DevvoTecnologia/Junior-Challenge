import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type { GithubReqUser } from "src/global/types";

import { AuthService } from "../auth.service";
import { GithubAuthGuard } from "../guards/github-auth.guard";
import type { SignInResponse } from "../types/SignIn";

@Controller("auth")
@ApiTags("Auth/Github")
export class GithubAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("github")
  @UseGuards(GithubAuthGuard)
  githubSignIn(): void {
    return void 0;
  }

  @Get("github/callback")
  @UseGuards(GithubAuthGuard)
  async githubSignInCallback(
    @Req() req: GithubReqUser,
  ): Promise<SignInResponse> {
    return await this.authService.signInWithGithub(req);
  }
}
