import { HttpResponse, HttpRequest } from './http'

export interface Controller {
  handle: (req: HttpRequest) => Promise<HttpResponse>
}
