import { CreateRingParams, ICreateRingRepository } from "../../controllers/create-ring/protocols";
import { RingModel, Rings } from "../../models/rings";

export class MongoCreateRingRepository implements ICreateRingRepository {
  async createRing(params: CreateRingParams): Promise<Rings> {
    try {
      const ring = new RingModel({
        ringName: params.ringName,
        powerName: params.powerName,
        ownerName: params.ownerName,
        builtBy: params.builtBy,
        imageUrl: params.imageUrl,
      });

      await ring.save();
      return ring; // Retorna o modelo Mongoose
    } catch (error) {
      console.error("Error in createRing from repository:", error);
      throw error;
    }
  }
}
