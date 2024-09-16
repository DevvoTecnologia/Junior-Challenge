import { Request, Response } from 'express'

import { IFetchForgerUseCase } from "@/domain/use-cases/forgers"

export class FetchForgerController {
    constructor(private readonly fetchForgerUseCase: IFetchForgerUseCase) {}

    async handle(request: Request, response: Response) {
        try {   
            const forgers = await this.fetchForgerUseCase.execute()

            return response.status(200).json(forgers)
        } catch (error: any) {
            return response.status(500).send()
        }
    }
}