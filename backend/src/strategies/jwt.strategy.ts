import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, type StrategyOptions } from "passport-jwt";
import type { JwtPayload, ReqUser } from "src/global/types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("token.secret"),
    } as StrategyOptions);
  }

  validate(payload: JwtPayload): ReqUser["user"] {
    return {
      sub: payload.sub,
      username: payload.username,
      email: payload.email,
    };
  }
}
