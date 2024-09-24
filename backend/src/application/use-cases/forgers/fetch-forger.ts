import { IFetchForgerUseCase } from "@/domain/use-cases/forgers"
import { ForgersRepository } from "@/application/protocols/database"

export class FetchForgerUseCase implements IFetchForgerUseCase {
    constructor(private readonly forgersRepository: ForgersRepository) {}

    async execute(): IFetchForgerUseCase.Output {
        const forger = await this.forgersRepository.fetch()

        return forger
    }
}