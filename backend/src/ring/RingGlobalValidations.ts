import { BadRequestException } from "@nestjs/common";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";

import type { Ring } from "./entities/ring.entity";
import type { ForgedBy } from "./types/ForgedBy";

export default class RingGlobalValidations {
  protected async validateRingCreation(
    ringModel: typeof Ring,
    forgedBy: string,
  ): Promise<void> {
    // Verify if Already Exists 3 Elfos Rings
    if (forgedBy === "Elfos") {
      const elfosRings = await ringModel.count({ where: { forgedBy } });

      if (elfosRings >= 3) {
        throw new BadRequestException(`Elfos can't forge more than 3 rings`);
      }
    }

    // Verify if Already Exists 7 Anões Rings
    if (forgedBy === "Anões") {
      const anoesRings = await ringModel.count({ where: { forgedBy } });

      if (anoesRings >= 7) {
        throw new BadRequestException(`Anões can't forge more than 7 rings`);
      }
    }

    // Verify if Already Exists 9 Homens Rings
    if (forgedBy === "Homens") {
      const homensRings = await ringModel.count({ where: { forgedBy } });

      if (homensRings >= 9) {
        throw new BadRequestException(`Homens can't forge more than 9 rings`);
      }
    }

    // Verify if Already Exists 1 Sauron Ring
    if (forgedBy === "Sauron") {
      const sauronRings = await ringModel.count({ where: { forgedBy } });

      if (sauronRings >= 1) {
        throw new BadRequestException(`Sauron can't forge more than 1 ring`);
      }
    }
  }

  protected isValidRing(forgedBy: ForgedBy): boolean {
    return ["Elfos", "Anões", "Homens", "Sauron"].includes(forgedBy);
  }

  protected async saveOrUpdateRingImage(
    file: Express.Multer.File,
    { isUpdate, oldFileName }: { isUpdate: boolean; oldFileName: string } = {
      isUpdate: false,
      oldFileName: "",
    },
  ): Promise<string> {
    if (isUpdate && !oldFileName) {
      throw new Error("oldFileName must be provided when isUpdate is true");
    }

    const destinationPath = join(process.cwd(), "uploads");

    const newUniqueImageName = `${Date.now()}-${file.originalname}`;

    const filePath = join(destinationPath, newUniqueImageName);

    if (await !existsSync(destinationPath)) {
      await mkdirSync(destinationPath);
    }

    if (isUpdate) {
      await this.deleteRingImage(oldFileName);
    }

    // Convert the image buffer to a file
    const bufferImageData = Buffer.from(file.buffer);

    await writeFileSync(filePath, bufferImageData);

    return newUniqueImageName;
  }

  protected async deleteRingImage(imageName: string): Promise<void> {
    const destinationPath = join(process.cwd(), "uploads");

    const filePath = join(destinationPath, imageName);

    if (await existsSync(filePath)) {
      await unlinkSync(filePath);
    }
  }
}
