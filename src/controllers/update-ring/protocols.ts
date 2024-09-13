import { Rings } from "../../models/rings";
import { HttpRequest, HttpResponse } from "../protocols";

export interface UpdateRingParams {
    ringName: string;
    powerName: string;
    ownerName: string;

}


export interface IUpdateRingController {
    handle(httpRequest: HttpRequest<any>):
        Promise<HttpResponse<Rings>>;
    
}

export interface IUpdateRingRepository {
    updateRing(id: string, params: UpdateRingParams): Promise<Rings>
}