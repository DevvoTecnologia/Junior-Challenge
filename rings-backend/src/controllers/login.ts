import { loginUser } from '@useCases/login/loginUser';
import { Router } from 'express';

export const loginRouter = Router();

loginRouter.post('/login', loginUser);
