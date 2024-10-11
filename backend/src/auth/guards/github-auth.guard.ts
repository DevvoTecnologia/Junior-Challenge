import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import type { Response } from "express";
import { GithubReqUser } from "src/global/types";

@Injectable()
export class GithubAuthGuard extends AuthGuard("github") {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  handleRequest<TUser = GithubReqUser["user"]>(
    err: Error | null,
    user: TUser | false,
    _info: never,
    context: ExecutionContext,
  ): TUser {
    const res: Response = context.switchToHttp().getResponse();

    const clientUrl = this.configService.get("allowedOrigin");

    if (err || !user) {
      res.redirect(clientUrl + "/login");
      throw new UnauthorizedException("Failed to authenticate with GitHub");
    }

    return user;
  }
}
