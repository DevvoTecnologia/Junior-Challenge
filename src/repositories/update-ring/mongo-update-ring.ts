import { IUpdateRingRepository, UpdateRingParams } from "../../controllers/update-ring/protocols";
import { MongoClient } from "../../database/mongo";
import { Rings } from "../../models/rings";
import { ObjectId } from "mongodb";

export class MongoUpdateRingRepository implements IUpdateRingRepository {
     async updateRing(id:string, params: UpdateRingParams): Promise<Rings> {
        await MongoClient.db
        .collection('rings')
        .updateOne({ _id: new ObjectId}, {
            $set: {
                ...params
            },
        });
        const rings = await MongoClient.db
        .collection<Omit<Rings, "id">>("rings")
        .findOne({ _id: new ObjectId(id)});
        if (!rings) {
            throw new Error("Ring not updated");
        }

        const { _id, ...rest} = rings;

        return { id: _id.toHexString(), ...rest}
    }

}