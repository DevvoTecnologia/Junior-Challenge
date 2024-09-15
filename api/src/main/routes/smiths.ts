import { Router } from 'express'
import { adaptRoute } from '../adapters/expressRouterAdapter'
import { makeReadAllSmithsController } from '../factories/makeReadAllSmithscontroller'

export default (router: Router): void => {
  router.get('/smiths', adaptRoute(makeReadAllSmithsController()))
}
