import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      statusCode: 400,
      errors: errors.array().map((error) => ({
        message: error.msg,
      })),
    });
    return;
  }
  next();
};
