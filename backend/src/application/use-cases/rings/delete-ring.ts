import { IDeleteRingUseCase } from "@/domain/use-cases/rings"
import { RingsRepository } from "@/application/protocols/database"

export class DeleteRingUseCase implements IDeleteRingUseCase {
    constructor(
        private readonly ringsRepository: RingsRepository
    ) {}

    async execute(input: IDeleteRingUseCase.Input): IDeleteRingUseCase.Output {
        const ringExists = await this.ringsRepository.findById({ ringId: input.ringId })

        if(!ringExists) {
          throw new Error("Ring does not exist")
        }

        await this.ringsRepository.delete({
            ringId: input.ringId,
        })
    }
}