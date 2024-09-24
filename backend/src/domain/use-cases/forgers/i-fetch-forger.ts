import { Forger } from "@/domain/entities"

export interface IFetchForgerUseCase {
    execute(): IFetchForgerUseCase.Output
}

export namespace IFetchForgerUseCase {
    export type Input = null

    export type Output = Promise<Forger[]>
}