export type CookieOptions = {
  name: string
  value: string
  options?: {
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
    maxAge?: number
  }
}

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
  cookies?: CookieOptions[]
}

export type HttpRequest = any

export const ok = (
  data: any = {},
  httpCode = 200,
  cookies?: CookieOptions[],
): HttpResponse => ({
  statusCode: httpCode,
  data,
  cookies,
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
