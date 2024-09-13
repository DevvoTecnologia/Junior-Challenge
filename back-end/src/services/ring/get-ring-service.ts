import { prismaClient } from '../../lib/prisma';

export class GetRingService {
  async execute({ id }: { id: string }) {
    return prismaClient.ring.findUnique({
      where: {
        id,
      },
    });
  }
}
