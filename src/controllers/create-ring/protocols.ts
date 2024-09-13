import { Rings } from "../../models/rings";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateRingController {
  handle(
    httpRequest: HttpRequest<CreateRingParams>
  ): Promise<HttpResponse<Rings>>;
}

export interface CreateRingParams {
  ringName: string;
  powerName: string;
  ownerName: string;
  builtBy: string;

}
export interface ICreateRingRepository {
  createRing(params: CreateRingParams): Promise<Rings>;
}
