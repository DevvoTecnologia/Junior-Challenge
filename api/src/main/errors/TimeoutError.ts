import { ErrorCode } from '@/presentation/contracts/http'
import { CustomError } from './CustomError'

export class TimeoutError extends CustomError {
  constructor(message: string = 'Request Timeout') {
    super(message, 408, ErrorCode.TIMEOUT)
  }
}
