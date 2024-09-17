import { IDeleteRingRepository } from "../../controllers/delete-ring/protocols";
import { RingModel, Rings } from "../../models/rings";
import { Types } from 'mongoose';

export class MongoDeleteRingRepository implements IDeleteRingRepository {
  async deleteRing(id: string): Promise<Rings | null> {
    try {
      // converte o id de string para objectId
      const objectId = new Types.ObjectId(id);
  
      const ring = await RingModel.findByIdAndDelete(objectId).exec();
      
      // retorna o anel sem tentar alterar o _id
      return ring;
    } catch (error) {
      console.error("Error in deleteRing:", error);
      throw error;
    }
  }
}
