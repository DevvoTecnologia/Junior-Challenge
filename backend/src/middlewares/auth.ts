import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { errorInRequest } from "../utils";

dotenv.config();

export function auth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1].replace('"', "").replace('"', "");

    jwt.verify(token, process.env.JWT_SECRET!, (err) => {
      if (err) {
        return errorInRequest(res, 403, "Token inválido");
      } else {
        next();
      }
    });
  } else {
    return errorInRequest(res, 403, "Token inválido");
  }
}
