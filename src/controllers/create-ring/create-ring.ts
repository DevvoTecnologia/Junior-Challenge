import { Rings } from "../../models/rings";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateRingParams,
  ICreateRingController,
  ICreateRingRepository,
} from "./protocols";

export class CreateRingController implements ICreateRingController {
  constructor(private readonly createRingRepository: ICreateRingRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateRingParams>
  ): Promise<HttpResponse<Rings>> {
    try {

      //verifica campos obrigatorios
      const requiredFields = ["ringName", "powerName", "ownerName", "builtBy"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateRingParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      
      const ring = await this.createRingRepository.createRing(
        httpRequest.body!
      );

      return {
        statusCode: 201,
        body: ring,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
      console.log(error);
    }
  }
}

