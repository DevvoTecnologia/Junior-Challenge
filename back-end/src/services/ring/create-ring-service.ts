import { prismaClient } from '../../lib/prisma';

interface RingRequest {
  name: string;
  power: string;
  bearer: string;
  forgedBy: string;
  image: string;
}

const ringLimits = {
  Elfos: 3,
  Anões: 7,
  Homens: 9,
  Sauron: 1,
};

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
            : `os ${forgedBy} já atingiram o limite de anéis`
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
