import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/httpError";
import { STATUS_CODES } from "../constants/httpCodes";
import User from "../models/userModel";

// Extend Request type to include user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

 
  const accessToken = req.params?.accessToken;
  console.log(accessToken);
  if (!accessToken) {
    throw new HttpError("Not authorized, no token", STATUS_CODES.UNAUTHORIZED);
  }

  try {
    // First decode without verification to get user ID
    const decoded = jwt.decode(accessToken) as { id?: string } | null;
    
    if (!decoded?.id) {
      throw new HttpError("Not authorized, invalid token structure", STATUS_CODES.UNAUTHORIZED);
    }

    // Fetch user with their secret
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      throw new HttpError("Not authorized, user not found", STATUS_CODES.NOT_FOUND);
    }

    if (!user.jwt_secret) {
      throw new HttpError("Server error: User jwt_secret missing", STATUS_CODES.SERVER_ERROR);
    }

    // Verify token with user's secret
    const verified = jwt.verify(accessToken, user.jwt_secret) as { id: string };
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      throw new HttpError("Not authorized, invalid token", STATUS_CODES.UNAUTHORIZED);
    }
    throw error; 
  }
});

export { protect };