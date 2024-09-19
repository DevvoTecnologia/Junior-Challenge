import { ErrorCode } from '@/presentation/contracts/http'
import { CustomError } from './CustomError'

export class ValidationError extends CustomError {
  public details: { path: (string | number)[]; message: string }[]

  constructor(details: { path: (string | number)[]; message: string }[]) {
    super('Validation Error', 422, ErrorCode.VALIDATION_ERROR)
    this.details = details
  }
}
