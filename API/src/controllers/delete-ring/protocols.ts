import { Rings } from "../../models/rings";
import { HttpResponse, HttpRequest } from "../protocols";

export interface IDeleteRingController {
  handle(
    httpRequest: HttpRequest<{ id: string }>
  ): Promise<HttpResponse<Rings>>;
}

export interface IDeleteRingRepository {
  deleteRing(id: string): Promise<Rings | null>;
}
