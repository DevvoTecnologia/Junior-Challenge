import { Response } from "express";

export function errorInRequest(
  res: Response,
  statusCode: number,
  message: string
) {
  return res.status(statusCode).json({
    error: {
      status: statusCode,
      message,
    },
  });
}
