import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll();

    if (users.length === 0) {
      throw new NotFoundException("No users found");
    }

    return users;
  }
}
