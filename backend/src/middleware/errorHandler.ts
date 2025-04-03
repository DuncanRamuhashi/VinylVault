import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Env_Consts } from "../constants/envConsts";
import HttpError from "../utils/httpError";
import { STATUS_CODES } from "../constants/httpCodes";

// Define error response interface
interface ErrorResponse {
  message: string;
  stack?: string;
  errors?: Array<{ path: string; message: string }>;
}

/**
 * Middleware to handle 404 Not Found errors
 */
const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new HttpError(`${req.originalUrl} : Not Found`, STATUS_CODES.NOT_FOUND);
  next(error);
};

/**
 * Handles Zod validation errors and formats them
 * @param err - ZodError instance
 * @returns Formatted error response
 */
const handleZodError = (err: ZodError): ErrorResponse => ({
  message: "Validation Error",
  errors: err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  })),
});

/**
 * Global error handling middleware
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const errorHandler = (
  err: Error | HttpError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  let statusCode = STATUS_CODES.SERVER_ERROR;
  let response: ErrorResponse = {
    message: "Internal Server Error",
    stack: Env_Consts.NODE_ENV === "development" ? err.stack : undefined,
  };

  // Handle custom HttpError
  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    response.message = err.message;
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    response = handleZodError(err);
  }

  res.status(statusCode).json(response);
};

export { errorHandler, notFound };
