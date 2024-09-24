import { Request, Response } from 'express'

import { IUpdateRingUseCase } from "@/domain/use-cases/rings"

export class UpdateRingController {
    constructor(private readonly updateRingUseCase: IUpdateRingUseCase) {}

    async handle(request: Request, response: Response) {
        try {
            const {
              ringId
            } = request.params

            const {
                name,
                power,
                proprietor,
                image,
                forgerId,
            } = request.body

            const result = await this.updateRingUseCase.execute({
                ringId,
                forgerId,
                image,
                name,
                power,
                proprietor
            })

            return response.status(201).json(result)
        } catch (error: any) {
            const message = error.message

            if (message === "Ring does not exist") {
                return response.status(400).json({ message })
            }

            if (message === "Forger not found") {
                return response.status(404).json({ message })
            }

            if (message === "Forger already has many rings") {
                return response.status(422).json({ message })
            }

            return response.status(500).send()
        }
    }
}