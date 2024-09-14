export type HttpError = {
  httpCode: number
  errorMessage: string
  errors: {
    code?: string
    path?: (string | number)[]
    message: string
  }[]
}

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export type HttpRequest = any

export const ok = (data: any = {}, httpCode = 200): HttpResponse => ({
  statusCode: httpCode,
  data,
})

export const serverError = (data: HttpError, httpCode = 500): HttpResponse => ({
  statusCode: httpCode,
  data,
})
