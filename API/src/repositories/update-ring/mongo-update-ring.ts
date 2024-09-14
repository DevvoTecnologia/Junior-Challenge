import { IUpdateRingRepository, UpdateRingParams } from "../../controllers/update-ring/protocols";
import { Rings } from "../../models/rings";
import { model, Schema, Document } from "mongoose";

// Defina um esquema e um modelo Mongoose para a coleção "rings"
const ringSchema = new Schema({
  // Defina o esquema de acordo com a estrutura de seu modelo Rings
  // Exemplo:
  // name: String,
  // size: Number,
  // ...
});

const RingModel = model<Rings & Document>("Rings", ringSchema);

export class MongoUpdateRingRepository implements IUpdateRingRepository {
  async updateRing(id: string, params: UpdateRingParams): Promise<Rings> {
    // Atualize o documento no MongoDB
    const result = await RingModel.findByIdAndUpdate(
      id,
      { $set: { ...params } },
      { new: true } // Retorne o documento atualizado
    ).exec();

    if (!result) {
      throw new Error("Ring not updated");
    }

    // Retorne o documento atualizado com o id como string
    const { _id, ...rest } = result
    return { id: _id.toHexString(), ...rest };
  }
}
