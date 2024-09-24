import { Ring } from "@/domain/entities"

export interface IUpdateRingUseCase {
    execute(input: IUpdateRingUseCase.Input): IUpdateRingUseCase.Output
}

export namespace IUpdateRingUseCase {
    export type Input = {
        ringId: string
        name?: string
        power?: string
        proprietor?: string
        image?: string
        forgerId?: string
    }

    export type Output = Promise<Ring>
}