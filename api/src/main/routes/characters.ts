import { Router } from 'express'
import { adaptRoute } from '../adapters/expressRouterAdapter'
import { makeReadAllCharactersController } from '../factories/makeReadAllCharactersController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export default (router: Router): void => {
  router.get(
    '/characters',
    ensureAuthenticated,
    adaptRoute(makeReadAllCharactersController()),
  )
}
