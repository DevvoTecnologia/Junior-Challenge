import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import type { GithubReqUser } from "src/global/types";

import { AuthService } from "../auth.service";
import { GithubAuthGuard } from "../guards/github-auth.guard";

@Controller("auth")
@ApiTags("Auth/Github")
export class GithubAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get("github")
  @UseGuards(GithubAuthGuard)
  githubSignIn(): void {
    return void 0;
  }

  @Get("github/callback")
  @UseGuards(GithubAuthGuard)
  async githubSignInCallback(
    @Req() req: GithubReqUser,
    @Res() res: Response,
  ): Promise<void> {
    const response = await this.authService.signInWithGithub(req);

    const { accessToken, username, email, userId } = response;

    const clientUrl = this.configService.get("allowedOrigin");
    const nodeEnv = this.configService.get("nodeEnv");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: nodeEnv !== "development",
    });

    res.cookie("username", username, {
      httpOnly: true,
      sameSite: "lax",
      secure: nodeEnv !== "development",
    });

    res.cookie("email", email, {
      httpOnly: true,
      sameSite: "lax",
      secure: nodeEnv !== "development",
    });

    res.cookie("userId", userId, {
      httpOnly: true,
      sameSite: "lax",
      secure: nodeEnv !== "development",
    });

    res.cookie("fromServer", "true", {
      httpOnly: false,
      sameSite: "lax",
      secure: nodeEnv !== "development",
    });

    return res.redirect(clientUrl + "/login");
  }
}
