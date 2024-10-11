import { BadRequestException } from "@nestjs/common";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

import type { User } from "./entities/user.entity";

export default class UserGlobalValidations {
  protected async deleteRingImage(imageName: string): Promise<void> {
    const destinationPath = join(process.cwd(), "uploads");

    const filePath = join(destinationPath, imageName);

    if (await existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  protected async validatePassword(
    user: User,
    password: string,
  ): Promise<void> {
    try {
      if (!(await user.passwordIsValid(password))) {
        throw new BadRequestException("Invalid password");
      }
    } catch {
      throw new BadRequestException("Invalid password");
    }
  }

  protected validateNewPassword(
    newPassword: string,
    oldPassword: string,
  ): void {
    if (newPassword.length < 4) {
      throw new BadRequestException(
        "Password must be at least 4 characters long",
      );
    }

    if (newPassword.length > 255) {
      throw new BadRequestException(
        "Password must be at most 255 characters long",
      );
    }

    if (newPassword === oldPassword) {
      throw new BadRequestException(
        "New password can not be the same as the old one",
      );
    }
  }

  protected validateUpdateOrDeleteUser({
    id,
    sub,
    msg,
  }: {
    id: number;
    sub: number;
    msg: string;
  }): void {
    if (sub !== id) {
      throw new BadRequestException(msg);
    }
  }
}
