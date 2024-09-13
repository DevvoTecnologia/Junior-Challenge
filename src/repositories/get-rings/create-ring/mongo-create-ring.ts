import {
    CreateRingParams, ICreateRingRepository
} from "../../../controllers/create-ring/protocols"
import { MongoClient } from "../../../database/mongo"
import { Rings } from "../../../models/rings"

export class MongoCreateRingRepository implements ICreateRingRepository {
    async createRing(params: CreateRingParams): Promise<Rings> {
        const { insertedId } = await MongoClient.db
        .collection("rings")
        .insertOne(params);

        const rings = await MongoClient.db
        .collection<Omit<Rings, "id">>("rings")
        .findOne({ _id: insertedId});

        if (!rings) {
            throw new Error ("Ring not created")
        }

        const {_id, ...rest} = rings;

        return { id: _id.toHexString(), ...rest}
    }
}