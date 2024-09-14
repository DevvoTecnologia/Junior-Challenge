import { Request, Response } from 'express'

import { IFetchRingUseCase } from "@/domain/use-cases/rings"

export class FetchRingController {
    constructor(private readonly fetchRingUseCase: IFetchRingUseCase) {}

    async handle(request: Request, response: Response) {
        try {
            const rings = this.fetchRingUseCase.execute()

            return response.status(200).json(rings)
        } catch (error: any) {
            return response.status(500).send()
        }
    }
}