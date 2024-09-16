import { Router } from 'express'
import { deleteUser, getAllUsers, updateUser } from '../controllers/userController'
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
}

