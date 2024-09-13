import { RingRequest } from '../../interfaces/ring-request';
import { prismaClient } from '../../lib/prisma';
import { ringLimits } from '../../validation/ring-limits';

export class UpdateRingService {
  async execute({
    id,
    name,
    power,
    bearer,
    forgedBy,
    image,
  }: Partial<RingRequest> & { id: string }) {
    const ringAlreadyExists = await prismaClient.ring.findUnique({
      where: { id },
    });

    if (!ringAlreadyExists) {
      throw new Error('Anel não encontrado.');
    }

    if (forgedBy && Object.keys(ringLimits).includes(forgedBy)) {
      const ringCount = await prismaClient.ring.count({
        where: {
          forgedBy,
        },
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
    }

    return prismaClient.ring.update({
      where: { id },
      data: {
        name: name || ringAlreadyExists.name,
        power: power || ringAlreadyExists.power,
        bearer: bearer || ringAlreadyExists.bearer,
        forgedBy: forgedBy || ringAlreadyExists.forgedBy,
        image: image || ringAlreadyExists.image,
      },
    });
  }
}
