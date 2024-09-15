import { CreateRingUseCase } from "@/application/use-cases/rings"
import { ForgersTypeOrmRepository, RingTypeORMRepository } from "@/infra/database/typeorm"
import { CreateRingController } from "@/presentation/controllers/rings"

export function makeCreateRingController() {
    const forgersRepository = new ForgersTypeOrmRepository()
    forgersRepository.create({
        forgerId: "forger-id",
        name: 'name',
        maxRings: 3,
    })

    const ringsRepository = new RingTypeORMRepository()
    const createRingUseCase = new CreateRingUseCase(forgersRepository, ringsRepository)
    return new CreateRingController(createRingUseCase)
}