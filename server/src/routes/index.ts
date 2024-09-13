import { Router } from 'express';
import { ringRouter } from './RingRoutes';

export const routes = Router();

routes.use('/rings', ringRouter);
