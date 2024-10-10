import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { ReqUser } from "src/global/types";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest<TUser = ReqUser["user"]>(
    err: Error | null,
    user: TUser | false,
    info: Error | undefined,
  ): TUser {
    if (err) {
      throw err;
    }

    if (!user) {
      if (info) {
        if (info.message === "No auth token") {
          throw new UnauthorizedException("Missing token");
        } else {
          throw new UnauthorizedException("Token is invalid or expired");
        }
      }

      throw new UnauthorizedException();
    }

    return user;
  }
}
