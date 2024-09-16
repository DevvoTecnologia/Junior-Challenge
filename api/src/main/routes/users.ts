import { Router } from 'express'
import { adaptRoute } from '../adapters/expressRouterAdapter'
import { makeCreateUserController } from '../factories/makeCreateUserController'

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeCreateUserController()))
}
