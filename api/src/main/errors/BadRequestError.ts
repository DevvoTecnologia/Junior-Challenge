import { ErrorCode } from '@/presentation/contracts/http'
import { CustomError } from './CustomError'

export class BadRequestError extends CustomError {
  constructor(message: string = 'Bad Request') {
    super(message, 400, ErrorCode.BAD_REQUEST)
  }
}
