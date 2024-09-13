import { prismaClient } from '../../lib/prisma';

export class ListRingService {
  async execute() {
    return prismaClient.ring.findMany();
  }
}
