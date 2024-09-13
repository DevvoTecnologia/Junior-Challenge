import { Rings } from "../../models/rings";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateRingController,
  IUpdateRingRepository,
  UpdateRingParams,
} from "./protocols";

export class UpdateRingController implements IUpdateRingController {
  constructor(private readonly updateRingRepository: IUpdateRingRepository) {}
  
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Rings>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing ring id",
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateRingParams)[] = [
        "ringName",
        "powerName",
        "ownerName",

      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateRingParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      const rings = await this.updateRingRepository.updateRing(id, body);

      return {
        statusCode: 200,
        body: rings
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };

      console.log(error);
    }
  }
}
