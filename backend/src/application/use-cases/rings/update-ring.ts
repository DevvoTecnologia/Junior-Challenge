import { IUpdateRingUseCase } from "@/domain/use-cases/rings"
import { ForgersRepository, RingsRepository } from "@/application/protocols/database"

export class UpdateRingUseCase implements IUpdateRingUseCase {
    constructor(
        private readonly forgersRepository: ForgersRepository,
        private readonly ringsRepository: RingsRepository
    ) {}

    async execute(input: IUpdateRingUseCase.Input): IUpdateRingUseCase.Output {
        const ringExists = await this.ringsRepository.findById({ ringId: input.ringId })

        if(!ringExists) {
          throw new Error("Ring does not exist")
        }

        const forger = await this.forgersRepository.findById({
            forgerId: input.forgerId ?? ringExists.forgerId
        })

        if (!forger) {
            throw new Error("Forger not found")
        }

        const canCreateRing = forger.rings.length + 1 <= forger.maxRings

        if (!canCreateRing) {
            throw new Error("Forger already has many rings")
        }

        const ring = await this.ringsRepository.update({
            ringId: input.ringId,
            forgerId: input.forgerId,
            image: input.image,
            name: input.name,
            power: input.power,
            proprietor: input.proprietor
        })

        return ring
    }
}