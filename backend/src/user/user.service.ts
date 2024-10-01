import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";
import { Ring } from "src/ring/entities/ring.entity";

import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ReqAuthUser } from "./types/Req";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly atributesToShow = ["id", "username"];
  private readonly includeAtributes = [
    {
      model: Ring,
      attributes: ["id", "name", "power", "owner", "forgedBy", "image"],
    },
  ];

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll({
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    if (users.length === 0) {
      throw new NotFoundException("No users found");
    }

    const host = this.configService.get("host");
    const port = this.configService.get("port");
    const nodeEnv = this.configService.get("nodeEnv");
    const baseUrl = nodeEnv === "development" ? `${host}:${port}` : host;

    users.forEach((user) => {
      user.rings.forEach((ring) => {
        ring.url = `${baseUrl}/uploads/${ring.image}`;
      });
    });

    return users;
  }

  async findByPk(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    this.logger.log(user);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const host = this.configService.get("host");
    const port = this.configService.get("port");
    const nodeEnv = this.configService.get("nodeEnv");
    const baseUrl = nodeEnv === "development" ? `${host}:${port}` : host;

    user.rings.forEach((ring) => {
      ring.url = `${baseUrl}/uploads/${ring.image}`;
    });

    return user;
  }

  async findOne(username: CreateUserDto["username"]): Promise<User> {
    const user = await this.userModel.findOne({
      where: { username },
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    const host = this.configService.get("host");
    const port = this.configService.get("port");
    const nodeEnv = this.configService.get("nodeEnv");
    const baseUrl = nodeEnv === "development" ? `${host}:${port}` : host;

    user.rings.forEach((ring) => {
      ring.url = `${baseUrl}/uploads/${ring.image}`;
    });

    return user;
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
    const { username, password, newPassword } = user;
    const { sub } = req.user;

    if (sub !== id) {
      throw new BadRequestException("You can not update this user");
    }

    const userToUpdate = await this.userModel.findByPk(id);

    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (password) {
      if (!(await userToUpdate.passwordIsValid(password))) {
        throw new BadRequestException("Invalid password");
      }
    } else {
      throw new BadRequestException("Password is required");
    }

    if (newPassword) {
      if (newPassword === password) {
        throw new BadRequestException(
          "New password can not be the same as the old one",
        );
      }

      userToUpdate.password = newPassword;
    } else {
      userToUpdate.password = password;
    }

    userToUpdate.username = username || userToUpdate.username;

    try {
      await userToUpdate.save();
    } catch {
      throw new BadRequestException("Username already exists");
    }

    return {
      id: userToUpdate.id,
      username: userToUpdate.username,
    };
  }

  async delete(
    id: number,
    deleteUserDto: DeleteUserDto,
    req: ReqAuthUser,
  ): Promise<null> {
    const { password } = deleteUserDto;

    const { sub } = req.user;

    if (sub !== id) {
      throw new BadRequestException("You can not delete this user");
    }

    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (!(await user.passwordIsValid(password))) {
      throw new BadRequestException("Invalid password");
    }

    await user.destroy();

    return null;
  }
}
