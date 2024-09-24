import { CreateRingUseCase } from "@/application/use-cases/rings"
import { ForgersTypeOrmRepository, RingTypeORMRepository } from "@/infra/database/typeorm/repositories"
import { CreateRingController } from "@/presentation/controllers/rings"

export function makeCreateRingController() {
    const forgersRepository = new ForgersTypeOrmRepository()
    const ringsRepository = new RingTypeORMRepository()
    const createRingUseCase = new CreateRingUseCase(forgersRepository, ringsRepository)
    return new CreateRingController(createRingUseCase)
}