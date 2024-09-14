import { Request, Response } from 'express'

import { ICreateRingUseCase } from "@/domain/use-cases/rings"

export class CreateRingController {
    constructor(private readonly createRingUseCase: ICreateRingUseCase) {}

    async handle(request: Request, response: Response) {
        try {
            const {
                name,
                power,
                proprietor,
                image,
                forgerId,
            } = request.body

            const result = await this.createRingUseCase.execute({
                name,
                power,
                proprietor,
                image,
                forgerId,
            })

            return response.status(201).json(result)
        } catch (error: any) {
            const message = error.message

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