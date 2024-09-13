import { Rings } from "../../models/rings";

export interface UpdateRingParams {
    ringName: string;
    powerName: string;
    ownerName: string;
}

export interface IUpdateRingRepository {
    updateRing(id: string, params: UpdateRingParams): Promise<Rings>
}