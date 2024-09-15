import { HttpError } from '@/presentation/contracts/http'
import {
  makeBadRequestError,
  makeDatabaseError,
  makeForbiddenError,
  makeNotFoundError,
  makeServerError,
  makeTimeoutError,
  makeUnauthorizedError,
  makeValidationError,
} from './errorUtils'
import { CustomError } from '../errors/CustomError'

const errorHandlers: Record<string, (error: any) => HttpError> = {
  ValidationError: (error: any) => makeValidationError(error.details),
  BusinessRuleViolationError: (error: Error) =>
    makeBadRequestError(error.message),
  NotFoundError: (error: Error) => makeNotFoundError(error.message),
  DatabaseError: (error: Error) => makeDatabaseError(error.message),
  UnauthorizedError: (error: Error) => makeUnauthorizedError(error.message),
  ForbiddenError: (error: Error) => makeForbiddenError(error.message),
  TimeoutError: (error: Error) => makeTimeoutError(error.message),
  CustomError: (error: CustomError) => ({
    httpCode: error.httpCode,
    errorMessage: error.message,
    errors: [{ code: error.errorCode, message: error.message }],
  }),
  default: () => makeServerError('Ocorreu um erro inesperado.'),
}

export const getErrorHandler = (error: Error): HttpError => {
  const errorName = error.constructor.name
  return (errorHandlers[errorName] || errorHandlers.default)(error)
}
