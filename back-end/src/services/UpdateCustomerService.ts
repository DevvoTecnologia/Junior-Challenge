// services/UpdateCustomerService.ts
import { PrismaClient } from '@prisma/client';

interface AnelData {
  imageURL?: string;
  power?: string;
  carrier?: string;
  forger?: string;
  info?: string;
}

class UpdateCustomerService {
  private prisma = new PrismaClient();

  async update(id: string, data: Partial<AnelData>) {
    try {
      const updatedAnel = await this.prisma.customer.update({
        where: { id }, // Atualiza com base no ID
        data: {
          ...data,
          updated_at: new Date(), // Atualiza a data de modificação
        },
      });

      return updatedAnel;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao atualizar o anel.');
      } else {
        throw new Error('Erro desconhecido ao atualizar o anel.');
      }
    }
  }

  async findById(id: string) {
    try {
      const anel = await this.prisma.customer.findUnique({
        where: { id },
      });

      if (!anel) {
        throw new Error('Anel não encontrado.');
      }

      return anel;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao buscar o anel.');
      } else {
        throw new Error('Erro desconhecido ao buscar o anel.');
      }
    }
  }
}

export { UpdateCustomerService };
