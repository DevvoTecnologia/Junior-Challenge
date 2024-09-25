import { BadRequestException } from "@nestjs/common";

import type { Ring } from "./entities/ring.entity";
import type { ForgedBy } from "./types/ForgedBy";

export default class RingGlobalValidations {
  async validateRingCreation(
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

  isValidRing(forgedBy: ForgedBy): boolean {
    return ["Elfos", "Anões", "Homens", "Sauron"].includes(forgedBy);
  }
}
