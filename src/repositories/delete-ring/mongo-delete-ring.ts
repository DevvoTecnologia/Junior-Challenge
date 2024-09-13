import { IDeleteRingRepository } from "../../controllers/delete-ring/protocols";
import { MongoClient } from "../../database/mongo";
import { Rings } from "../../models/rings";
import { ObjectId } from "mongodb";

export class MongoDeleteRingRepository implements IDeleteRingRepository {
  async deleteRing(id: string): Promise<Rings> {
    const rings = await MongoClient.db
      .collection<Omit<Rings, "id">>("rings")
      .findOne({ _id: new ObjectId(id) });

    if (!rings) {
      throw new Error("Ring not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("rings")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Ring not deleted");
    }

    const { _id, ...rest } = rings;

    return { id: _id.toHexString(), ...rest };
  }
}
