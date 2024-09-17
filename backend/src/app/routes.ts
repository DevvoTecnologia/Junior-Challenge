import { Router } from 'express';
import { RingController } from './controllers/RingController';
import { UserController } from './controllers/UserController';

export const routes = Router();

const ringController = new RingController();
const userController = new UserController();

routes.post('/login', userController.loginUser.bind(userController));
routes.get('/authenticate', userController.authenticateUser.bind(userController));

routes.get('/', ringController.listRings.bind(ringController));
routes.get('/:id', ringController.getRing.bind(ringController));
routes.post('/ring', ringController.createRings.bind(ringController));
routes.put('/ring/:id', ringController.updateRing.bind(ringController));
routes.delete('/ring/:id', ringController.deleteRing.bind(ringController));