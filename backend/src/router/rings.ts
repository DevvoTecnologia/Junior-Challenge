import { Router } from 'express'
import { isAuthenticated } from '../middlewares'
import { createRing, deleteRing, listRings, updateRing } from '../controllers/ringController'

export default (router: Router) => {
    router.get('/rings', isAuthenticated, listRings)
    router.post('/rings', isAuthenticated, createRing)
    router.delete('/rings/:id', isAuthenticated, deleteRing)
    router.patch('/rings/:id', isAuthenticated, updateRing)
}

