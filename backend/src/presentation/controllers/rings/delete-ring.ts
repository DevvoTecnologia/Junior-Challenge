import { Request, Response } from 'express'

import { IDeleteRingUseCase } from "@/domain/use-cases/rings"

export class DeleteRingController {
    constructor(private readonly deleteRingUseCase: IDeleteRingUseCase) {}

    async handle(request: Request, response: Response) {
        try {
            const {
              ringId
            } = request.params

            this.deleteRingUseCase.execute({
                ringId,
            })

            return response.status(204)
        } catch (error: any) {
            const message = error.message

            if (message === "Ring does not exist") {
                return response.status(400).json({ message })
            }

            return response.status(500).send()
        }
    }
}