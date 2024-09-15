import { DeleteRingUseCase } from "@/application/use-cases/rings"
import { RingTypeORMRepository } from "@/infra/database/typeorm"
import { DeleteRingController } from "@/presentation/controllers/rings"

export function makeDeleteRingController() {
    const ringsRepository = new RingTypeORMRepository()
    const deleteRingUseCase = new DeleteRingUseCase(ringsRepository)
    return new DeleteRingController(deleteRingUseCase)
}