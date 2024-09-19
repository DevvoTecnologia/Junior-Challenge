import { ErrorCode } from '@/presentation/contracts/http'
import { CustomError } from '@/main/errors/CustomError'

export class DatabaseError extends CustomError {
  constructor(message: string = 'Database Error') {
    super(message, 500, ErrorCode.DATABASE_ERROR)
  }
}
