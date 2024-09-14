import { Rings } from "../../models/rings";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateRingController {
  handle(
    httpRequest: HttpRequest<CreateRingParams>
  ): Promise<HttpResponse<Rings>>;
}

export interface CreateRingParams {
  id: string;
  ringName: string;
  powerName: string;
  ownerName: string;
  builtBy: string;
  imageUrl: string;

}
export interface ICreateRingRepository {
  createRing(params: CreateRingParams): Promise<Rings>;
}
