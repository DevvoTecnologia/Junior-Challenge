import { prismaClient } from '../../lib/prisma';

export class RemoveRingService {
  async execute({ id }: { id: string }) {
    return prismaClient.ring.delete({
      where: {
        id,
      },
    });
  }
}
