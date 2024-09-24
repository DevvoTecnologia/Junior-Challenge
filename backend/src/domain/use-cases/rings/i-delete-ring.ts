export interface IDeleteRingUseCase {
    execute(input: IDeleteRingUseCase.Input): IDeleteRingUseCase.Output
}

export namespace IDeleteRingUseCase {
    export type Input = {
        ringId: string
    }

    export type Output = Promise<void>
}