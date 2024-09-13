import { Request, Response } from 'express'

export class FetchRing {
  async execute(request: Request, response: Response) {
    try {
      response.send([])
    } catch (err) {
      console.error(err)
    }
  }
}