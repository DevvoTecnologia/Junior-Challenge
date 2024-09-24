import { Forger, Ring } from "@/domain/entities"

export interface ICreateForgerUseCase {
    execute(input: ICreateForgerUseCase.Input): ICreateForgerUseCase.Output
}

export namespace ICreateForgerUseCase {
    export type Input = {
        forgerId?: string
        name: string
        maxRings: number
    }

    export type Output = Promise<Forger>
}