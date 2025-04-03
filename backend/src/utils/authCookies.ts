import { Response } from "express";

/**
 * Clears the access and refresh token cookies.
 * @param {Response} res - The Express response object.
 */
export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("jwt_token"); // Clear the access token cookie (adjust name if needed)
  res.clearCookie("refreshToken"); // Clear the refresh token cookie (if used)
};
