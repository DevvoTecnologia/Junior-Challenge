import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import type { GithubReqUser } from "src/global/types";

import { GithubAuthGuard } from "../guards/github-auth.guard";
import { GithubAuthService } from "../providers/github-auth.service";

@Controller("auth")
@ApiTags("Auth/Github")
export class GithubAuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly githubAuthService: GithubAuthService,
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
    const response = await this.githubAuthService.signIn(req);

    const { accessToken, username, email, userId } = response;

    const clientUrl = this.configService.get("allowedOrigin");
    const nodeEnv = this.configService.get("nodeEnv");

    const payloadStringfied = JSON.stringify({
      accessToken,
      username,
      email,
      userId,
      fromServer: true,
    });

    res.cookie("serverResponseData", payloadStringfied, {
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
