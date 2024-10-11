import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import type { GithubReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";

import { AuthDto } from "./dto/auth.dto";
import { GithubAuthService } from "./providers/github-auth.service";
import { LocalAuthService } from "./providers/local-auth.service";
import type { SignInResponse } from "./types/SignIn";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly githubAuthService: GithubAuthService,
    private readonly localAuthService: LocalAuthService,
  ) {}

  async signIn(authDto: AuthDto): Promise<SignInResponse> {
    const user = await this.userModel.findOne({
      where: { email: authDto.email },
    });

    if (
      !user ||
      !user.canSignWithEmailAndPassword ||
      !(await user.passwordIsValid(authDto.password))
    ) {
      throw new UnauthorizedException("User or password incorrect");
    }

    return await this.localAuthService.signIn(user);
  }

  async signInWithGithub(req: GithubReqUser): Promise<SignInResponse> {
    const { githubUserId } = req.user;

    const user = await this.userModel.findOne({
      where: { githubUserId },
    });

    if (!user) {
      return await this.githubAuthService.createNewUser(req);
    }

    return await this.githubAuthService.signIn(user, req);
  }
}
