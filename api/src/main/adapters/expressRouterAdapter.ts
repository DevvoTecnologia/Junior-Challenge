import { Request, Response } from 'express'
import { Controller } from '@/presentation/contracts/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req)

    if (httpResponse.cookies) {
      httpResponse.cookies.forEach((cookie) => {
        res.cookie(cookie.name, cookie.value, cookie.options || {})
      })
    }

    res.status(httpResponse.statusCode).json(httpResponse.data)
  }
}
