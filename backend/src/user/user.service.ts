import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { ReqAuthUser } from "./types/Req";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findByPk(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOne(username: CreateUserDto["username"]): Promise<User> {
    const user = await this.userModel.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
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

  async create(user: CreateUserDto): Promise<User> {
    const { username, password } = user;

    let newUser: User;

    try {
      newUser = await this.userModel.create({ username, password });
    } catch {
      throw new BadRequestException("Username already exists");
    }

    return newUser;
  }

  async update(
    id: number,
    user: CreateUserDto,
    req: ReqAuthUser,
  ): Promise<User> {
    const { username, password } = user;
    const { sub } = req.user;

    if (sub !== id) {
      throw new BadRequestException("You can not update this user");
    }

    const userToUpdate = await this.findByPk(id);

    userToUpdate.username = username;
    userToUpdate.password = password;

    await userToUpdate.save();

    return userToUpdate;
  }

  async delete(id: number, req: ReqAuthUser): Promise<void> {
    const { sub } = req.user;

    if (sub !== id) {
      throw new BadRequestException("You can not delete this user");
    }

    const user = await this.findByPk(id);

    await user.destroy();
  }
}
