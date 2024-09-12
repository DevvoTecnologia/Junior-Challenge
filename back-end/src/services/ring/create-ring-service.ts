import { RingRequest } from '../../interfaces/ring-request';
import { prismaClient } from '../../lib/prisma';
import { ringLimits } from '../../validation/ring-limits';

export class CreateRingService {
  async execute({ name, power, bearer, forgedBy, image }: RingRequest) {
    const ringCount = await prismaClient.ring.count({
      where: { forgedBy },
    });

    if (ringCount >= ringLimits[forgedBy as keyof typeof ringLimits]) {
      throw new Error(
        `${
          forgedBy === 'Sauron'
            ? `${forgedBy} já atingiu o limite de anéis`
            : `Os ${forgedBy} já atingiram o limite de anéis`
        }  (${ringLimits[forgedBy as keyof typeof ringLimits]}).`,
      );
    }

    return prismaClient.ring.create({
      data: {
        name,
        power,
        bearer,
        forgedBy,
        image,
      },
    });
  }
}