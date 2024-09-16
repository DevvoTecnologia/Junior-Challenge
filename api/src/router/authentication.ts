import express from 'express';

import {login, logout, register, validateToken} from '../controllers/authentication';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
  router.post('/auth/validate', validateToken); 
  router.post('/auth/logout', logout);
}