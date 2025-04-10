import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../constants/httpCodes";
import HttpError from "../utils/httpError"; // Import custom HttpError class
import { ZodSchema } from "zod";

/**
 * Middleware for validating request bodies against a Zod schema.
 *
 * @param schema - The Zod schema to validate against.
 * @returns Express middleware function.
 */
const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
  
    if (!result.success) {
        const errors = result.error.errors.map((e) => e.message).join(", ");
        return next(new HttpError(`Validation Failed: ${errors}`, STATUS_CODES.BAD_REQUEST));
    }

    req.body = result.data; 
    next();
};

export default validate;
