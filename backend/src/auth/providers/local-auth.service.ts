import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import type { ReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";

import { AuthDto } from "../dto/auth.dto";
import type { SignInResponse } from "../types/SignIn";

@Injectable()
export class LocalAuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
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
