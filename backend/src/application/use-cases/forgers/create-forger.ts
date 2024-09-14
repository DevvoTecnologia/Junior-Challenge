import { ICreateForgerUseCase } from "@/domain/use-cases/forgers"
import { ForgersRepository } from "@/application/protocols/database"

export class CreateForgerUseCase implements ICreateForgerUseCase {
    constructor(private readonly forgersRepository: ForgersRepository) {}

    async execute(input: ICreateForgerUseCase.Input): ICreateForgerUseCase.Output {
        const forger = await this.forgersRepository.create({
            forgerId: input.forgerId,
            name: input.name,
            maxRings: input.maxRings,
        })

        return forger
    }
}