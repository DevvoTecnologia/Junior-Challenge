import { ReadAllCharactersUseCase } from '@/domain/useCases/readAllCharactersUseCase'
import { Controller } from '../contracts/controller'
import { HttpResponse, ok } from '../contracts/http'

export class ReadAllCharactersController implements Controller {
  constructor(private readonly readAllCharacters: ReadAllCharactersUseCase) {}

  async handle(): Promise<HttpResponse> {
    const characters = await this.readAllCharacters.execute()
    return ok(characters)
  }
}
