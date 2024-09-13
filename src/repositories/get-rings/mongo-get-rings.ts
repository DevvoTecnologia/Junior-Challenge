import { IGetRingsRepository } from "../../controllers/get-ring/protocols";
import { MongoClient } from "../../database/mongo";
import { Rings } from "../../models/rings";

export class MongoGetRingsRepository implements IGetRingsRepository {
  async getRings(): Promise<Rings[]> {
    const rings = await MongoClient.db
      .collection<Omit<Rings, "id">>("rings")
      .find({})
      .toArray();

    //transforma o _id em id
    return rings.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
