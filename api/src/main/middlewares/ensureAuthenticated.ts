import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      message: 'Token não encontrado',
    })
  }

  const [, token] = authToken.split(' ')

  try {
    jwt.verify(token, '395ad606-2bbc-4e77-86b4-1a31e91ab5b5')
    return next()
  } catch {
    return res.status(401).json({
      message: 'Token inválido',
    })
  }
}
