import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

router.post('/login', (req, res, next) => {
  AuthController.login(req.body)
    .then(result => res.json(result))
    .catch(err => next(err));
});

export default router;
