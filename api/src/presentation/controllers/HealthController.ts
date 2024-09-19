import { Controller } from '../contracts/controller'
import { HttpResponse, ok } from '../contracts/http'

export class HealthController implements Controller {
  async handle(): Promise<HttpResponse> {
    return ok()
  }
}
