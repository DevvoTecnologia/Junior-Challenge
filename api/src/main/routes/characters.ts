import { Router } from 'express'
import { adaptRoute } from '../adapters/expressRouterAdapter'
import { makeReadAllCharactersController } from '../factories/makeReadAllCharactersController'

export default (router: Router): void => {
  router.get('/characters', adaptRoute(makeReadAllCharactersController()))
}
