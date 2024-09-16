
import { Rings } from "../../models/rings";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteRingController, IDeleteRingRepository } from "./protocols";

export class DeleteRingController implements IDeleteRingController {
    constructor(private readonly deleteRingRepository: IDeleteRingRepository) {}

    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<Rings>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return {
                    statusCode: 400,
                    body: "Missing ring id"
                }
            }

            const rings = await this.deleteRingRepository.deleteRing(id)

            if (!rings) {
                return {
                    statusCode: 404,
                    body: "Ring not found"
                };
            }

            return {
                statusCode: 200,
                body: rings
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong"
            };

            console.log(error)
        }
    }
}