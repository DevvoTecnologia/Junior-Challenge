import { ICreateRingUseCase } from "@/domain/use-cases/rings"
import { ForgersRepository, RingsRepository } from "@/application/protocols/database"

export class CreateRingUseCase implements ICreateRingUseCase {
    constructor(
        private readonly forgersRepository: ForgersRepository,
        private readonly ringsRepository: RingsRepository
    ) {}

    async execute(input: ICreateRingUseCase.Input): ICreateRingUseCase.Output {
        const forger = await this.forgersRepository.findById({
            forgerId: input.forgerId
        })

        if (!forger) {
            throw new Error("Forger not found")
        }

        const canCreateRing = forger.rings.length + 1 <= forger.maxRings

        if (!canCreateRing) {
            throw new Error("Forger already has many rings")
        }

        const ring = await this.ringsRepository.create({
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