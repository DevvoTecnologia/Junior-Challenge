import { HttpRequest, HttpResponse } from "../protocols";
import { Rings } from "../../models/rings";

export interface IUpdateRingController {
  handle(httpRequest: HttpRequest<UpdateRingParams>): Promise<HttpResponse<Rings>>;
}

export interface IUpdateRingRepository {
    updateRing(id: string, payload: Partial<Rings>): Promise<Rings | null>;
  }

  export interface UpdateRingParams {
    id: string;
    ringName?: string; 
    powerName?: string;
    ownerName?: string;
    builtBy?: string;
    imageUrl?: string;
  }
  