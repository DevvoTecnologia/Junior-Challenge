import { Rings } from "../../models/rings";

 export interface IDeleteRingRepository {
    deleteRing(id: string): Promise<Rings>
 }