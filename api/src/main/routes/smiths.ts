import { Router } from 'express'
import { adaptRoute } from '../adapters/expressRouterAdapter'
import { makeReadAllSmithsController } from '../factories/makeReadAllSmithscontroller'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export default (router: Router): void => {
  router.get(
    '/smiths',
    ensureAuthenticated,
    adaptRoute(makeReadAllSmithsController()),
  )
}
