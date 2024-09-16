import { Router } from 'express'
import { adaptRoute } from '../adapters/expressRouterAdapter'
import { makeUserAuthenticationController } from '../factories/makeUserAuthenticationController'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeUserAuthenticationController()))
}
