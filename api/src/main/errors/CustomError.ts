import { ErrorCode } from '@/presentation/contracts/http'

export class CustomError extends Error {
  public httpCode: number
  public errorCode: ErrorCode

  constructor(
    message: string,
    httpCode = 500,
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
  ) {
    super(message)
    this.httpCode = httpCode
    this.errorCode = errorCode

    this.name = this.constructor.name
  }
}
