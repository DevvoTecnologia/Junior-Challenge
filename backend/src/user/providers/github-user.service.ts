import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { cacheKeys } from "src/global/constants";
import type { ReqUser } from "src/global/types";
import { Ring } from "src/ring/entities/ring.entity";

import { DeleteUserGithubDto } from "../dto/delete-user.github.dto";
import { UpdateUserGithubDto } from "../dto/update-user.github.dto";
import { User } from "../entities/user.entity";
import UserGlobalValidations from "../utils/UserGlobalValidations";

@Injectable()
export class GithubUserService extends UserGlobalValidations {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }

  async update(
    id: number,
    user: UpdateUserGithubDto,
    req: ReqUser,
  ): Promise<Pick<User, "id" | "username" | "email">> {
    const { username } = user;
    const { sub } = req.user;

    // Check if user is trying to update his own data
    this.validateUpdateOrDeleteUser({
      id,
      sub,
      msg: "You can not update this user",
    });

    const userToUpdate = await this.userModel.findByPk(id);

    if (!userToUpdate?.githubUserId) {
      throw new BadRequestException("User is not a Github user");
    }

    userToUpdate.username = username || userToUpdate.username; // nosonar

    await userToUpdate.save();

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
    deleteUserDto: DeleteUserGithubDto,
    req: ReqUser,
  ): Promise<null> {
    const { confirm } = deleteUserDto;

    if (!confirm) {
      throw new BadRequestException("You must confirm the deletion");
    }

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

    if (!user?.githubUserId) {
      throw new BadRequestException("User is not a Github user");
    }

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
