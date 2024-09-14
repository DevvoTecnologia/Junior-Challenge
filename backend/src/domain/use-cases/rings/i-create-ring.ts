import { Ring } from "@/domain/entities"

export interface ICreateRingUseCase {
    execute(input: ICreateRingUseCase.Input): ICreateRingUseCase.Output
}

export namespace ICreateRingUseCase {
    export type Input = {
        ringId?: string
        name: string
        power: string
        proprietor: string
        image: string
        forgerId: string
    }

    export type Output = Promise<Ring>
}