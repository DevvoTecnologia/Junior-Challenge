import { Rings } from "../../models/rings";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteRingController {
    handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<Rings>>
}


export interface IDeleteRingRepository {
    deleteRing(id: string): Promise<Rings | null>;
  }
  
 