import { NextFunction, Request, Response } from 'express'
import { getErrorHandler } from '../helpers/errorMapper'

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(error)

  const httpError = getErrorHandler(error)
  res.status(httpError.httpCode).json({
    errorMessage: httpError.errorMessage,
    errors: httpError.errors,
  })

  next()
}
