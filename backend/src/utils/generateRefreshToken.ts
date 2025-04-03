import crypto from "crypto";

/**
 * Interface representing the user object structure
 */
interface User {
  _id: string;
}

/**
 * Generates a long-lived refresh token.
 * @param {User} user - The user object containing user details.
 * @returns {Promise<string>} - The generated refresh token.
 * @throws {Error} - If token generation fails
 */
const generateRefreshToken = async (user: User): Promise<string> => {
  // Input validation
  if (!user?._id || typeof user._id !== "string") {
    throw new Error("Invalid user ID provided");
  }

  try {
    const random = crypto.randomBytes(64);
    const refreshToken = random.toString("hex");

    return refreshToken;
  } catch (error) {
    throw new Error(`Failed to generate refresh token: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

export default generateRefreshToken;