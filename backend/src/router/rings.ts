import { Router } from 'express'
import { isAuthenticated } from '../middlewares'
import { createRing, deleteRing, listRings, updateRing } from '../controllers/ringController'

export default (router: Router) => {
    router.get('/rings', listRings)
    router.post('/rings', createRing)
    router.delete('/rings/:id', deleteRing)
    router.patch('/rings/:id', updateRing)
}

