import express from "express";

import authentication from './authentication';
import users from './users';
import rings from "./rings";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  rings(router);

  return router
};