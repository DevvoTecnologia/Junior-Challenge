import { Ring } from "@/domain/entities"

export interface IFetchRingUseCase {
  execute(): IFetchRingUseCase.Output
}

export namespace IFetchRingUseCase {
  export type Input = null

  export type Output = Promise<Ring[]>
}