import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { cacheKeys } from "src/global/constants";
import type { GithubReqUser, ReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";

import type { SignInResponse } from "../types/SignIn";

@Injectable()
export class GithubAuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async createNewUser(req: GithubReqUser): Promise<SignInResponse> {
    const { username, email, githubUserId } = req.user;

    let newUser: User;

    try {
      newUser = await this.userModel.create({
        username,
        githubUserId,
        email: email || null, // nosonar
        canSignWithEmailAndPassword: false,
      });
    } catch {
      throw new BadRequestException("Something went wrong creating the user");
    }

    const payload: ReqUser["user"] = {
      sub: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    // invalidate cache for users
    await this.cacheManager.del(cacheKeys.users());

    return {
      accessToken: accessToken,
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(user: User, _req: GithubReqUser): Promise<SignInResponse> {
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
