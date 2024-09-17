import { RingModel } from '../../models/rings'; // Importa o modelo Mongoose para Rings
import { Rings } from '../../models/rings'; // Importa a interface Rings do modelo

export class MongoUpdateRingRepository {
  // metodo para atualizar o anel
  async updateRing(ringId: string, updateData: Partial<Rings>): Promise<Rings | null> {
    try {
      // procura o anel pelo id e atualiza os dados
      const updatedRing = await RingModel.findByIdAndUpdate(ringId, updateData, { new: true });

      return updatedRing;
    } catch (error) {
      console.error(`Erro ao atualizar o anel: ${error}`);
      throw new Error('Erro ao atualizar o anel');
    }
  }
}
