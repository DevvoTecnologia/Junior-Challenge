import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { ReqUser } from "src/global/types";

interface JwtPayload {
  sub: number;
  username: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("token.secret"),
    });
  }

  validate(payload: JwtPayload): ReqUser["user"] {
    return {
      sub: payload.sub,
      username: payload.username,
    };
  }
}
