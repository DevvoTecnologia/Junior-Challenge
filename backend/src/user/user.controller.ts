import { Controller, Get } from "@nestjs/common";

import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
