import { Rings } from "../../models/rings";
import { HttpResponse } from "../protocols";

export interface IGetRingsController {
  handle(): Promise<HttpResponse<Rings[]>>;
}


// src/get-ring/protocols.ts


export interface IGetRingsRepository {
  getRingById(id: string): Promise<Rings | null>;
  getRings(): Promise<Rings[]>;
}
