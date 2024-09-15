import { ErrorCode } from '@/presentation/contracts/http'
import { CustomError } from '@/main/errors/CustomError'

export class NotFoundError extends CustomError {
  public resource: string
  public resourceId?: string

  constructor(resource: string, resourceId?: string) {
    super(
      `${resource} ${resourceId ? `com ID ${resourceId}` : ''} não encontrado`,
      404,
      ErrorCode.NOT_FOUND,
    )
    this.resource = resource
    this.resourceId = resourceId
  }
}
