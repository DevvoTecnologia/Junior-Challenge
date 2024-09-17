import { Rings } from "../../models/rings";
import { HttpRequest, HttpResponse } from "../protocols";

export interface CreateRingParams {
  ringName: string;
  powerName: string;
  ownerName: string;
  builtBy: string;
  imageUrl?: string;
}

export interface ICreateRingController {
  handle(
    httpRequest: HttpRequest<CreateRingParams>
  ): Promise<HttpResponse<Rings>>;
}

export interface ICreateRingRepository {
  createRing(params: CreateRingParams): Promise<Rings>;
}
