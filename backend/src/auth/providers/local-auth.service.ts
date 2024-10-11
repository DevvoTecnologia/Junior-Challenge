import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { ReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";

import type { SignInResponse } from "../types/SignIn";

@Injectable()
export class LocalAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(user: User): Promise<SignInResponse> {
    const payload: ReqUser["user"] = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken: accessToken,
      userId: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
