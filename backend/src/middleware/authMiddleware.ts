import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/httpError";
import { STATUS_CODES } from "../constants/httpCodes";
import User from "../models/userModel"; // Ensure User model is imported

// Extend Request type to include user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.accessToken; // Check for access token cookie

  if (!accessToken) {
    return next(new HttpError("Not authorized, no token", STATUS_CODES.UNAUTHORIZED));
  }

  // Decode token to extract user ID
  const decoded = jwt.decode(accessToken) as { id?: string } | null;

  if (!decoded?.id) {
    return next(new HttpError("Not authorized, invalid token structure", STATUS_CODES.UNAUTHORIZED));
  }

  // Find user by ID
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    return next(new HttpError("Not authorized, user not found", STATUS_CODES.NOT_FOUND));
  }

  // Retrieve user's current JWT secret from the database
  if (!user.jwt_secret) {
    return next(new HttpError("Server error: User jwt_secret missing", STATUS_CODES.SERVER_ERROR));
  }

  // Verify the access token using user's JWT secret
  try {
    jwt.verify(accessToken, user.jwt_secret);
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (verificationError) {
    return next(new HttpError("Not authorized, invalid token", STATUS_CODES.UNAUTHORIZED));
  }
});

export { protect };
