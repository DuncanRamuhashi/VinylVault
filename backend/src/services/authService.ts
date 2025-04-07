import User, { IUser } from "../models/userModel";
import HttpError from "../utils/httpError";
import { STATUS_CODES } from "../constants/httpCodes";
import crypto from "crypto";

import { RegisterUserDTO, LoginUserDTO } from "../dto/authDto";

/**
 * Registers a new user.
 * @param {RegisterUserDTO} userData - The user data for registration.
 * @returns {Promise<IUser>} - The created user object.
 */
export const registerUser = async (userData: RegisterUserDTO): Promise<IUser> => {
  const { name, email, password } = userData;

  // Check if user exists
  if (await User.findOne({ email })) {
    throw new HttpError("Email already exists", STATUS_CODES.CONFLICT);
  }

  const jwt_secret = crypto.randomBytes(30).toString("hex");
   
  const user = await User.create({
    name,
    email,
    password,
    jwt_secret,
  });

  return user;
};

/**
 * Logs in a user.
 * @param {LoginUserDTO} userData - The user credentials.
 * @returns {Promise<IUser>} - The authenticated user object.
 */
export const loginUser = async (userData: LoginUserDTO): Promise<IUser> => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError("Email doesn't exist", STATUS_CODES.NOT_FOUND);
  }

  // Correct usage of matchPassword
  const isPasswordValid = await user.matchPassword(password);

  if (!isPasswordValid) {
    throw new HttpError("Incorrect email or password", STATUS_CODES.UNAUTHORIZED);
  }

  return user;
};
