import { FetchForgerUseCase } from "@/application/use-cases/forgers"
import { ForgersTypeOrmRepository } from "@/infra/database/typeorm/repositories"
import { FetchForgerController } from "@/presentation/controllers/forgers"

export function makeFetchForgerController() {
    const ringsRepository = new ForgersTypeOrmRepository()
    const fetchRingUseCase = new FetchForgerUseCase(ringsRepository)
    return new FetchForgerController(fetchRingUseCase)
}