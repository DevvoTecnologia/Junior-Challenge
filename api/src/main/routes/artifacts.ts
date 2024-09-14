import { Router } from 'express'

export default (router: Router): void => {
  router.get('/artifacts')
  router.get('/artifacts/:id')
  router.post('/artifacts')
  router.put('/artifacts/:id')
  router.delete('/artifacts/:id')
}
