import { RingModel } from '../../models/rings'; // Importa o modelo Mongoose para Rings
import { Rings } from '../../models/rings'; // Importa a interface Rings do modelo

// Cria a classe MongoUpdateRingRepository
export class MongoUpdateRingRepository {
  // Método para atualizar o anel
  async updateRing(ringId: string, updateData: Partial<Rings>): Promise<Rings | null> {
    try {
      // Procura o anel pelo ID e atualiza os dados
      const updatedRing = await RingModel.findByIdAndUpdate(ringId, updateData, { new: true });
      
      // Retorna o anel atualizado ou null se não encontrado
      return updatedRing;
    } catch (error) {
      console.error(`Erro ao atualizar o anel: ${error}`);
      throw new Error('Erro ao atualizar o anel');
    }
  }
}
