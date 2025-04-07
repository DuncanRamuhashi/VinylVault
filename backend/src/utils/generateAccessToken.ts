import jwt from "jsonwebtoken";
import { Env_Consts } from "../constants/envConsts";
import { ObjectId } from "mongodb";
import { extractUserId } from "./extractUserId";
/**
 * Interface representing the user object structure.
 */
interface User {
  _id: string | ObjectId; // Ensure this matches what IUser provides
}

/**
 * Generates a short-lived access token.
 * @param {User} user - The user object containing user details.
 * @returns {string} - The generated JWT access token.
 * @throws {Error} - If JWT secret is missing or token generation fails
 */
const generateAccessToken = (user: User): string => {
  // Input validation
  let userId: string;
  const _id= extractUserId(user);
  if (!_id) {
    throw new Error("No user ID provided");
  }

  // Convert _id to string if it’s an ObjectId or other type
  userId = typeof user._id === "string" ? user._id : user._id.toString();

  const jwtOptions: jwt.SignOptions = {
    expiresIn: "15m", // Short-lived access token
    issuer: "duncan.com",
    audience: "API V1",
  };

  const secretKey = Env_Consts.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT secret key is not configured in environment variables");
  }

  try {
    const token = jwt.sign(
      {
        id: userId, // Use the converted string ID
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