import expressAsyncHandler from "express-async-handler";
import { registerUser, loginUser } from "../services/authService";
import generateToken from "../utils/generateToken";
import userModel, { IUser } from "../models/userModel";
import { STATUS_CODES } from "../constants/httpCodes";
import { clearAuthCookies } from "../utils/authCookies";

export const registerHandler = expressAsyncHandler(async (req, res, next) => {
  const user: IUser = await registerUser(req.body);
 
  await generateToken(user, res);

  res.status(STATUS_CODES.CREATED).json({
    status: "User successfully registered",
    data: user, 
  });
});
export const loginHandler = expressAsyncHandler(async (req, res, next) => {
    const user = await loginUser(req.body); //using login Service
  
    const { accessToken, refreshToken } = await generateToken(user, res);
    res.status(200).json({
      status: "User successfully logged alright",
      accessToken,
      refreshToken,
    
    });
  });
export const logoutHandler = expressAsyncHandler(async (req, res, next) => {
    clearAuthCookies(res);
    res.status(STATUS_CODES.OK).json({
      status: "Logout Handler",
    });
  });
  