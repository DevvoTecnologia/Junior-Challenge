import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import type { GithubReqUser, ReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";

import type { SignInResponse } from "../types/SignIn";

@Injectable()
export class GithubAuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly configServie: ConfigService,
  ) {}

  async createNewUser(req: GithubReqUser): Promise<SignInResponse> {
    const { username, email, githubUserId } = req.user;

    let newUser: User;

    const clientUrl = this.configServie.get("allowedOrigin");

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

    req.res?.redirect(clientUrl + "/users");

    return {
      accessToken: accessToken,
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  async signIn(user: User, req: GithubReqUser): Promise<SignInResponse> {
    const clientUrl = this.configServie.get("allowedOrigin");

    const payload: ReqUser["user"] = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    req.res?.redirect(clientUrl + "/users");

    return {
      accessToken: accessToken,
      userId: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
