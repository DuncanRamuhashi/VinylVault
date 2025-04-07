import { Response } from "express";
import { Env_Consts } from "../constants/envConsts";
import { after30Days } from "../constants/dateConsts";
import generateAccessToken from "./generateAccessToken";
import generateRefreshToken from "./generateRefreshToken";
import { IUser } from "../models/userModel";

interface CookieOptions {
  httpOnly: boolean;
  sameSite: "strict" | "lax" | "none";
  secure: boolean;
  expires: Date;
  path: string;
}

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string): void => {
  if (res.headersSent) {
    throw new Error("Headers already sent; cannot set cookies");
  }

  res.cookie("accessToken", accessToken, accessCookieOptions());
  res.cookie("refreshToken", refreshToken, refreshCookieOptions());
};

const accessCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "strict",
  secure: Env_Consts.NODE_ENV === "production",
  expires: after30Days(),
  path: "/api",
});

const refreshCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  sameSite: "strict",
  secure: Env_Consts.NODE_ENV === "production",
  expires: after30Days(),
  path: "/api/refresh",
});

const generateToken = async (
  user: IUser,
  res: Response
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    if (!user?._id) {
      throw new Error("Invalid user object");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    setAuthCookies(res, accessToken, refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error generating tokens:", error);
    throw new Error(`Failed to generate tokens: ${errorMessage}`);
  }
};

export default generateToken;