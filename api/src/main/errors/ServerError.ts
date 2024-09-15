import { ErrorCode } from '@/presentation/contracts/http'
import { CustomError } from './CustomError'

export class ServerError extends CustomError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500, ErrorCode.SERVER_ERROR)
  }
}
