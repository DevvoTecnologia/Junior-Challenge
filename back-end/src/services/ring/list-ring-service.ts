import { prismaClient } from '../../lib/prisma';

export class ListRingService {
  async execute() {
    try {
      return prismaClient.ring.findMany();
    } catch (error: any) {
      throw new Error('Erro ao buscar os anéis. Tente novamente mais tarde.');
    }
  }
}
