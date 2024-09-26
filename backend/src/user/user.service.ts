import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ReqAuthUser } from "./types/Req";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly atributesToShow = ["id", "username"];

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findByPk(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: this.atributesToShow,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOne(username: CreateUserDto["username"]): Promise<User> {
    const user = await this.userModel.findOne({
      where: { username },
      attributes: this.atributesToShow,
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll({
      attributes: this.atributesToShow,
    });

    if (users.length === 0) {
      throw new NotFoundException("No users found");
    }

    return users;
  }

  async create(user: CreateUserDto): Promise<Pick<User, "id" | "username">> {
    const { username, password } = user;

    let newUser: User;

    try {
      newUser = await this.userModel.create({ username, password });
    } catch {
      throw new BadRequestException("Username already exists");
    }

    return {
      id: newUser.id,
      username: newUser.username,
    };
  }

  async update(
    id: number,
    user: UpdateUserDto,
    req: ReqAuthUser,
  ): Promise<Pick<User, "id" | "username">> {
    const { username, password } = user;
    const { sub } = req.user;

    if (sub !== id) {
      throw new BadRequestException("You can not update this user");
    }

    const userToUpdate = await this.findByPk(id);

    userToUpdate.username = username ?? userToUpdate.username;
    userToUpdate.password = password ?? userToUpdate.password;

    try {
      await userToUpdate.save();
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException("Username already exists");
    }

    return {
      id: userToUpdate.id,
      username: userToUpdate.username,
    };
  }

  async delete(id: number, req: ReqAuthUser): Promise<null> {
    const { sub } = req.user;

    if (sub !== id) {
      throw new BadRequestException("You can not delete this user");
    }

    const user = await this.findByPk(id);

    await user.destroy();

    return null;
  }
}
