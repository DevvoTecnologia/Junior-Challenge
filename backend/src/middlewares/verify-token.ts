import { Request, Response, NextFunction } from "express";
import TokenHelper from "../helpers/TokenHelper";
import { TokenExpiredError } from "jsonwebtoken";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token || token === null || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const isValid = TokenHelper.VerifyToken(token);

  if (!isValid) {
    console.log("is not valid");

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  next();
}
