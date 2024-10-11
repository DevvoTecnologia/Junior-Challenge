import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { type Profile, Strategy } from "passport-github2";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get("github.clientId"),
      clientSecret: configService.get("github.clientSecret"),
      callbackURL: configService.get("github.callbackUrl"),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<{
    username: string | undefined;
    githubUserId: string;
  }> {
    const { username, id } = profile;

    return { username, githubUserId: id };
  }
}
