import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { cacheKeys } from "src/global/constants";
import type { ReqUser } from "src/global/types";
import { Ring } from "src/ring/entities/ring.entity";

import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import UserGlobalValidations from "./utils/UserGlobalValidations";

@Injectable()
export class UserService extends UserGlobalValidations {
  private readonly logger = new Logger(UserService.name);
  private readonly atributesToShow = ["id", "username", "email"];
  private readonly includeAtributes = [
    {
      model: Ring,
      attributes: ["id", "name", "power", "owner", "forgedBy", "image", "url"],
    },
  ];

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }

  async findAll(): Promise<User[]> {
    const cachedUsers = await this.cacheManager.get<User[]>(cacheKeys.users());
    const notFoundMsg = "No users found";

    if (cachedUsers) {
      if (cachedUsers.length) {
        return cachedUsers;
      }
      throw new NotFoundException(notFoundMsg);
    }

    const users = await this.userModel.findAll({
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    await this.cacheManager.set(cacheKeys.users(), users);

    if (users.length === 0) {
      throw new NotFoundException(notFoundMsg);
    }

    return users;
  }

  async findByPk(id: number): Promise<User> {
    const cachedUser = await this.cacheManager.get<User | "NotFound">(
      cacheKeys.user(id),
    );
    const notFoundMsg = `User not found`;

    if (cachedUser) {
      if (cachedUser === "NotFound") {
        throw new NotFoundException(notFoundMsg);
      }
      return cachedUser;
    }

    const user = await this.userModel.findByPk(id, {
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    await this.cacheManager.set(cacheKeys.user(id), user || "NotFound");

    if (!user) {
      throw new NotFoundException(notFoundMsg);
    }

    return user;
  }

  async findOne(email: CreateUserDto["email"]): Promise<User> {
    const notFoundMsg = `User with email ${email} not found`;

    const user = await this.userModel.findOne({
      where: { email },
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    if (!user) {
      throw new NotFoundException(notFoundMsg);
    }

    return user;
  }

  async create(
    user: CreateUserDto,
  ): Promise<Pick<User, "id" | "username" | "email">> {
    const { username, email, password } = user;

    let newUser: User;

    try {
      newUser = await this.userModel.create({
        username,
        email,
        password,
        canSignWithEmailAndPassword: true,
      });
    } catch {
      throw new BadRequestException("User already exists");
    }

    // Invalidate cache
    await this.cacheManager.del(cacheKeys.users());

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  async update(
    id: number,
    user: UpdateUserDto,
    req: ReqUser,
  ): Promise<Pick<User, "id" | "username" | "email">> {
    const { username, email, password, newPassword } = user;
    const { sub } = req.user;

    // Check if user is trying to update his own data
    this.validateUpdateOrDeleteUser({
      id,
      sub,
      msg: "You can not update this user",
    });

    const userToUpdate = await this.userModel.findByPk(id);

    if (!userToUpdate) {
      throw new NotFoundException(`User not found`);
    }

    if (password) {
      await this.validatePassword(userToUpdate, password);
    } else {
      throw new BadRequestException("Password is required");
    }

    if (newPassword) {
      this.validateNewPassword(newPassword, password);

      userToUpdate.password = newPassword;
    } else {
      userToUpdate.password = password;
    }

    userToUpdate.username = username || userToUpdate.username; // nosonar
    userToUpdate.email = email || userToUpdate.email; // nosonar

    try {
      await userToUpdate.save();
    } catch {
      throw new BadRequestException("User already exists");
    }

    // Invalidate cache
    await this.cacheManager.del(cacheKeys.users());
    await this.cacheManager.del(cacheKeys.user(id));

    return {
      id: userToUpdate.id,
      username: userToUpdate.username,
      email: userToUpdate.email,
    };
  }

  async delete(
    id: number,
    deleteUserDto: DeleteUserDto,
    req: ReqUser,
  ): Promise<null> {
    const { password } = deleteUserDto;

    const { sub } = req.user;

    // Check if user is trying to delete his own data
    this.validateUpdateOrDeleteUser({
      id,
      sub,
      msg: "You can not delete this user",
    });

    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Ring,
          attributes: ["id", "image"],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    await this.validatePassword(user, password);

    // Delete all rings images when user is deleted
    const deleteImagesPromises = user.rings.map(async (ring) => {
      await this.deleteRingImage(ring.image);
    });

    // Delete all rings
    await Promise.all(deleteImagesPromises);

    await user.destroy();

    // Invalidate cache
    await this.cacheManager.del(cacheKeys.users());
    await this.cacheManager.del(cacheKeys.user(id));

    return null;
  }
}
