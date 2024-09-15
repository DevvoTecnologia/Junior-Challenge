import { ReadAllSmithsUseCase } from '@/domain/useCases/readAllSmithsUseCase'
import { Controller } from '../contracts/controller'
import { HttpResponse, ok } from '../contracts/http'

export class ReadAllSmithsController implements Controller {
  constructor(private readonly readAllSmiths: ReadAllSmithsUseCase) {}

  async handle(): Promise<HttpResponse> {
    const smiths = await this.readAllSmiths.execute()
    return ok(smiths)
  }
}
