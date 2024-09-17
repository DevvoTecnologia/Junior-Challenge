import { Rings } from "../../models/rings";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteRingController, IDeleteRingRepository } from "./protocols";

export class DeleteRingController implements IDeleteRingController {
  constructor(private readonly deleteRingRepository: IDeleteRingRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Rings>> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing ring id"
        };
      }

      const ring = await this.deleteRingRepository.deleteRing(id);

      if (!ring) {
        return {
          statusCode: 404,
          body: "Ring not found"
        };
      }

      return {
        statusCode: 200,
        body: ring
      };
    } catch (error) {
      console.error('Error in deleteRingController:', error);
      return {
        statusCode: 500,
        body: "Something went wrong"
      };
    }
  }
}
