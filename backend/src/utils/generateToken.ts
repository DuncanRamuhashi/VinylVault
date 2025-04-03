import { Response } from "express";
import { Env_Consts } from "../constants/envConsts";
import { after30Days } from "../constants/dateConsts";
import generateAccessToken from "./generateAccessToken";
import generateRefreshToken from "./generateRefreshToken";

// Define cookie options interface
interface CookieOptions {
  httpOnly: boolean;
  sameSite: "strict" | "lax" | "none";
  secure: boolean;
  expires: Date;
  path: string;
}

/**
 * Interface for User model
 */
interface User {
  _id: string;
  refreshToken?: string;
  save: () => Promise<void>;
}

/**
 * Sets the access and refresh tokens as HTTP-only cookies
 * @param res - The Express response object
 * @param accessToken - The access token
 * @param refreshToken - The refresh token
 * @throws {Error} If headers are already sent
 */
const setAuthCookies = (res: Response, accessToken: string, refreshToken: string): void => {
  if (res.headersSent) {
    throw new Error("Headers already sent; cannot set cookies");
  }

  res.cookie("accessToken", accessToken, accessCookieOptions());
  res.cookie("refreshToken", refreshToken, refreshCookieOptions());
};

/**
 * Creates options for the JWT access cookie
 * @returns {CookieOptions} The cookie options
 */
const accessCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "strict",
  secure: Env_Consts.NODE_ENV === "production",
  expires: after30Days(),
  path: "/api",
});

/**
 * Creates options for the JWT refresh cookie
 * @returns {CookieOptions} The cookie options
 */
const refreshCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "strict",
  secure: Env_Consts.NODE_ENV === "production",
  expires: after30Days(),
  path: "/api/refresh",
});

/**
 * Generates JWT tokens for the user and sets them as HTTP-only cookies
 * @param user - The user object containing user details
 * @param res - The Express response object
 * @returns {Promise<{ accessToken: string; refreshToken: string }>} Object containing both tokens
 * @throws {Error} If token generation or storage fails
 */
const generateToken = async (
  user: User,
  res: Response
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    // Input validation
    if (!user?._id) {
      throw new Error("Invalid user object");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    // Store refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    setAuthCookies(res, accessToken, refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error generating tokens:", error);
    throw new Error(`Failed to generate tokens: ${errorMessage}`);
  }
};

export default generateToken;