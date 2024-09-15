export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export type HttpRequest = any

export const ok = (data: any = {}, httpCode = 200): HttpResponse => ({
  statusCode: httpCode,
  data,
})

export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  SERVER_ERROR = 'SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  TIMEOUT = 'TIMEOUT',
  BAD_REQUEST = 'BAD_REQUEST',
}

export type HttpError = {
  httpCode: number
  errorMessage: string
  errors: {
    code: ErrorCode
    path?: (string | number)[]
    message: string
  }[]
}

export const serverError = (data: HttpError, httpCode = 500): HttpResponse => ({
  statusCode: httpCode,
  data,
})
