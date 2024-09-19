import { ErrorCode } from '@/presentation/contracts/http'
import { CustomError } from './CustomError'

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, ErrorCode.UNAUTHORIZED)
  }
}
