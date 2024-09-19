import { Router } from 'express'
import { adaptRoute } from '../adapters/expressRouterAdapter'
import { makeHealthController } from '../factories/makeHealthController'

export default (router: Router): void => {
  router.get('/health', adaptRoute(makeHealthController()))
}
