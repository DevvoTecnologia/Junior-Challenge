import { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError";

// Define um formato de erro padrão
interface ErrorResponse {
  statusCode: number;
  message: string;
}

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  const errorResponse: ErrorResponse = {
    statusCode,
    message,
  };

  res.status(statusCode).json(errorResponse);
};
