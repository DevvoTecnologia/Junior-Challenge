import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto): Promise<{
    accessToken: string;
    userId: number;
    username: string;
  }> {
    const user = await this.userService.findOne(authDto.username);

    if (!(await user.passwordIsValid(authDto.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      userId: user.id,
      username: user.username,
    };
  }
}
