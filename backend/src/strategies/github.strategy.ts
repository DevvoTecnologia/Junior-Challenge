import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { type Profile, Strategy, StrategyOptions } from "passport-github2";
import { GithubReqUser } from "src/global/types";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get("github.clientId"),
      clientSecret: configService.get("github.clientSecret"),
      callbackURL: configService.get("github.callbackUrl"),
    } as StrategyOptions);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<GithubReqUser["user"]> {
    const { username, id, emails } = profile;

    const email = emails?.[0].value;

    return { username, githubUserId: id, email };
  }
}
