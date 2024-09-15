import { ErrorCode, HttpError } from '@/presentation/contracts/http'
import { z } from 'zod'

export const makeValidationError = (zodError: z.ZodError): HttpError => ({
  httpCode: 422,
  errorMessage: 'Validation Error',
  errors: zodError.issues.map((issue) => ({
    code: ErrorCode.VALIDATION_ERROR,
    path: issue.path,
    message: issue.message,
  })),
})

export const makeNotFoundError = (
  resource: string,
  resourceId?: string,
): HttpError => ({
  httpCode: 404,
  errorMessage: `${resource} not found`,
  errors: [
    {
      code: ErrorCode.NOT_FOUND,
      message: resourceId
        ? `${resource} with ID ${resourceId} not found`
        : `${resource} not found`,
    },
  ],
})

export const makeConflictError = (message: string): HttpError => ({
  httpCode: 409,
  errorMessage: 'Conflict Error',
  errors: [
    {
      code: ErrorCode.CONFLICT,
      message,
    },
  ],
})

export const makeServerError = (message: string): HttpError => ({
  httpCode: 500,
  errorMessage: 'Internal Server Error',
  errors: [
    {
      code: ErrorCode.SERVER_ERROR,
      message,
    },
  ],
})

export const makeDatabaseError = (message: string): HttpError => ({
  httpCode: 500,
  errorMessage: 'Database Error',
  errors: [
    {
      code: ErrorCode.DATABASE_ERROR,
      message,
    },
  ],
})

export const makeUnauthorizedError = (message = 'Unauthorized'): HttpError => ({
  httpCode: 401,
  errorMessage: 'Unauthorized',
  errors: [
    {
      code: ErrorCode.UNAUTHORIZED,
      message,
    },
  ],
})

export const makeForbiddenError = (message = 'Access Denied'): HttpError => ({
  httpCode: 403,
  errorMessage: 'Forbidden',
  errors: [
    {
      code: ErrorCode.FORBIDDEN,
      message,
    },
  ],
})

export const makeBadRequestError = (message: string): HttpError => ({
  httpCode: 400,
  errorMessage: 'Bad Request',
  errors: [
    {
      code: ErrorCode.VALIDATION_ERROR,
      message,
    },
  ],
})

export const makeTimeoutError = (message = 'Request Timeout'): HttpError => ({
  httpCode: 408,
  errorMessage: 'Timeout',
  errors: [
    {
      code: ErrorCode.TIMEOUT,
      message,
    },
  ],
})

export const makeRateLimitError = (
  message = 'Too Many Requests',
): HttpError => ({
  httpCode: 429,
  errorMessage: 'Too Many Requests',
  errors: [
    {
      code: ErrorCode.CONFLICT,
      message,
    },
  ],
})

export const makeGenericError = (
  httpCode: number,
  errorMessage: string,
  errors: { code: ErrorCode; path?: (string | number)[]; message: string }[],
): HttpError => ({
  httpCode,
  errorMessage,
  errors,
})
