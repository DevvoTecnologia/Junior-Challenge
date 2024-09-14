import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/expressRouterAdapter'
import { makeCreateArtifactController } from '@/main/factories/makeCreateArtifactController'

export default (router: Router): void => {
  // router.get('/artifacts')
  // router.get('/artifacts/:id')
  router.post('/artifacts', adaptRoute(makeCreateArtifactController()))
  // router.put('/artifacts/:id')
  // router.delete('/artifacts/:id')
}
