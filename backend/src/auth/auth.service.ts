import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/entities/user.entity";

import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto): Promise<{
    accessToken: string;
    userId: number;
    username: string;
  }> {
    const user = await this.userModel.findOne({
      where: { username: authDto.username },
    });

    if (!user) {
      throw new UnauthorizedException("User or password incorrect");
    }

    if (!(await user.passwordIsValid(authDto.password))) {
      throw new UnauthorizedException("User or password incorrect");
    }

    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      userId: user.id,
      username: user.username,
    };
  }
}
