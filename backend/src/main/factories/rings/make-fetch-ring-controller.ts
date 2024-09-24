import { FetchRingUseCase } from "@/application/use-cases/rings"
import { RingTypeORMRepository } from "@/infra/database/typeorm/repositories"
import { FetchRingController } from "@/presentation/controllers/rings"

export function makeFetchRingController() {
    const ringsRepository = new RingTypeORMRepository()
    const fetchRingUseCase = new FetchRingUseCase(ringsRepository)
    return new FetchRingController(fetchRingUseCase)
}