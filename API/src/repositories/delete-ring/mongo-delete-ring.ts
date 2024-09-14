import { IDeleteRingRepository } from "../../controllers/delete-ring/protocols";
import { RingModel, Rings } from "../../models/rings";

// Repositório para deletar anéis
export class MongoDeleteRingRepository implements IDeleteRingRepository {
  async deleteRing(id: string): Promise<Rings | null> {
    try {
      // Remove o anel com o id fornecido
      return await RingModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error("Error in deleteRing:", error);
      throw error;
    }
  }
}
