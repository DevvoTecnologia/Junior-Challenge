import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/expressRouterAdapter'
import { makeCreateArtifactController } from '@/main/factories/makeCreateArtifactController'
import { makeReadAllArtifactsController } from '../factories/makeReadAllArtifactsController'
import { makeUpdateArtifactController } from '../factories/makeUpdateArtifactController'
import { makeDeleteArtifactController } from '../factories/makeDeleteArtifactController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export default (router: Router): void => {
  router.get(
    '/artifacts',
    ensureAuthenticated,
    adaptRoute(makeReadAllArtifactsController()),
  )
  // router.get('/artifacts/:id')
  router.post(
    '/artifacts',
    ensureAuthenticated,
    adaptRoute(makeCreateArtifactController()),
  )
  router.put(
    '/artifacts/:id',
    ensureAuthenticated,
    adaptRoute(makeUpdateArtifactController()),
  )
  router.delete(
    '/artifacts/:id',
    ensureAuthenticated,
    adaptRoute(makeDeleteArtifactController()),
  )
}
