import { UpdateRingUseCase } from "@/application/use-cases/rings"
import { ForgersTypeOrmRepository, RingTypeORMRepository } from "@/infra/database/typeorm"
import { UpdateRingController } from "@/presentation/controllers/rings"

export function makeUpdateRingController() {
    const forgersRepository = new ForgersTypeOrmRepository()
    const ringsRepository = new RingTypeORMRepository()
    const updateRingUseCase = new UpdateRingUseCase(forgersRepository, ringsRepository)
    return new UpdateRingController(updateRingUseCase)
}