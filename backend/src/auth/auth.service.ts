import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";

import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async signIn(authDto: AuthDto): Promise<any> {
    const user = await this.userService.findOne(authDto.username);

    if (user.password !== authDto.password) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }
}
