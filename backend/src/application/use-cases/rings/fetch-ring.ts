import { IFetchRingUseCase } from "@/domain/use-cases/rings"
import { RingsRepository } from "@/application/protocols/database"

export class FetchRingUseCase implements IFetchRingUseCase {
    constructor(
        private readonly ringsRepository: RingsRepository
    ) {}

    async execute(): IFetchRingUseCase.Output {
        const rings = await this.ringsRepository.fetch()

        return rings
    }
}