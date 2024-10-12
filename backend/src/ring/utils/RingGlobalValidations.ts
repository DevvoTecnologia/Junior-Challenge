import { BadRequestException } from "@nestjs/common";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { isValidImage } from "multiform-validator";
import { join } from "path";
import * as sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

import type { Ring } from "../entities/ring.entity";
import type { ForgedBy } from "../types/ForgedBy";

export default class RingGlobalValidations {
  private readonly destinationPath = join(process.cwd(), "uploads");

  private async validateForgedByLimit(
    ringModel: typeof Ring,
    forgedBy: string,
    userId: number,
  ): Promise<void> {
    // Verify if Already Exists 3 Elfos Rings
    if (forgedBy === "Elfos") {
      const elfosRings = await ringModel.count({ where: { forgedBy, userId } });

      if (elfosRings >= 3) {
        throw new BadRequestException(`Elfos can't forge more than 3 rings`);
      }
    }

    // Verify if Already Exists 7 Anões Rings
    if (forgedBy === "Anões") {
      const anoesRings = await ringModel.count({ where: { forgedBy, userId } });

      if (anoesRings >= 7) {
        throw new BadRequestException(`Anões can't forge more than 7 rings`);
      }
    }

    // Verify if Already Exists 9 Homens Rings
    if (forgedBy === "Homens") {
      const homensRings = await ringModel.count({
        where: { forgedBy, userId },
      });

      if (homensRings >= 9) {
        throw new BadRequestException(`Homens can't forge more than 9 rings`);
      }
    }

    // Verify if Already Exists 1 Sauron Ring
    if (forgedBy === "Sauron") {
      const sauronRings = await ringModel.count({
        where: { forgedBy, userId },
      });

      if (sauronRings >= 1) {
        throw new BadRequestException(`Sauron can't forge more than 1 ring`);
      }
    }
  }

  protected fieldsIsEmptyTrimmed({
    name,
    power,
    owner,
    forgedBy,
  }: {
    name: string;
    power: string;
    owner: string;
    forgedBy: string;
  }): void {
    if (!name.trim() || !power.trim() || !owner.trim() || !forgedBy.trim()) {
      throw new BadRequestException("All fields are required");
    }
  }

  protected updateFieldsIsEmptyTrimmed({
    name,
    power,
    owner,
    forgedBy,
  }: {
    name?: string;
    power?: string;
    owner?: string;
    forgedBy?: string;
  }): void {
    if (name && !name.trim()) {
      throw new BadRequestException("Name if provided must not be empty");
    }

    if (power && !power.trim()) {
      throw new BadRequestException("Power if provided must not be empty");
    }

    if (owner && !owner.trim()) {
      throw new BadRequestException("Owner if provided must not be empty");
    }

    if (forgedBy && !forgedBy.trim()) {
      throw new BadRequestException("ForgedBy if provided must not be empty");
    }
  }

  protected async validateRingCreation(
    ringModel: typeof Ring,
    forgedBy: string,
    userId: number,
    ring?: Ring,
  ): Promise<void> {
    if (ring) {
      if (ring.forgedBy !== forgedBy) {
        await this.validateForgedByLimit(ringModel, forgedBy, userId);
      }
      // Allow the update
      return;
    }

    // Apply the limit validation
    await this.validateForgedByLimit(ringModel, forgedBy, userId);
  }

  protected async validateImageType(
    buffer: Express.Multer.File["buffer"],
  ): Promise<void> {
    const errorMsg = "Validation failed (expected type is /jpeg|png/)";

    if (
      !isValidImage(buffer, {
        exclude: ["gif", "ico"],
      })
    ) {
      throw new BadRequestException(errorMsg);
    }

    try {
      await sharp(buffer).metadata();
    } catch {
      throw new BadRequestException(errorMsg);
    }
  }

  protected isValidRing(forgedBy: ForgedBy): boolean {
    return ["Elfos", "Anões", "Homens", "Sauron"].includes(forgedBy);
  }

  protected generateNewUniqueImageName(originalname: string): string {
    return `${uuidv4()}-${Date.now()}-${originalname}`;
  }

  protected async saveRingImage(
    buffer: Express.Multer.File["buffer"],
    newUniqueImageName: string,
  ): Promise<void> {
    const filePath = join(this.destinationPath, newUniqueImageName);

    if (await !existsSync(this.destinationPath)) {
      mkdirSync(this.destinationPath);
    }

    writeFileSync(filePath, buffer);
  }

  protected async updateRingImage(
    file: Express.Multer.File,
    oldFileName: string,
  ): Promise<string> {
    await this.validateImageType(file.buffer);

    await this.deleteRingImage(oldFileName);

    const newUniqueImageName = this.generateNewUniqueImageName(
      file.originalname,
    );

    const filePath = join(this.destinationPath, newUniqueImageName);

    writeFileSync(filePath, file.buffer);

    return newUniqueImageName;
  }

  protected async deleteRingImage(imageName: string): Promise<void> {
    const destinationPath = join(process.cwd(), "uploads");

    const filePath = join(destinationPath, imageName);

    if (await existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }
}
