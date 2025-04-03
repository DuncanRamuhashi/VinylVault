import jwt from "jsonwebtoken";
import { Env_Consts } from "../constants/envConsts";

/**
 * Interface representing the user object structure.
 */
interface User {
  _id: string;
}

/**
 * Generates a short-lived access token.
 * @param {User} user - The user object containing user details.
 * @returns {string} - The generated JWT access token.
 * @throws {Error} - If JWT secret is missing or token generation fails
 */
const generateAccessToken = (user: User): string => {
  // Input validation
  if (!user?._id || typeof user._id !== "string") {
    throw new Error("Invalid user ID provided");
  }

  const jwtOptions: jwt.SignOptions = {
    expiresIn: "15m", // Short-lived access token
    issuer: "duncan.com",
    audience: "API V1",
  };

  // Only use environment variable for security (removed user.jwt_secret fallback)
  const secretKey = Env_Consts.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT secret key is not configured in environment variables");
  }

  try {
    const token = jwt.sign(
      {
        id: user._id,
      },
      secretKey,
      jwtOptions
    );
    
    return token;
  } catch (error) {
    throw new Error(`Failed to generate access token: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export default generateAccessToken;