import User from "../models/user.model.js";
import ApiError from "../utils/errors.js";

import { hashPassword, verifyPassword } from "../utils/passwords.js";
import { saveSession, revokeSession } from "./session.service.js";

// Register a new user.
export const registerService = async (reqData) => {
  const { name, email, password } = reqData;

  const hashedPassword = await hashPassword(password);

  try {
    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
    });

    return {
      message: "User registered successfully",
      userData: {
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(
        "User already registered",
        409,
        "EMAIL_ALREADY_EXISTS",
      );
    }

    throw error;
  }
};

// Log in a user.
export const loginService = async (req, reqData) => {
  const { email, password } = reqData;

  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw new ApiError("Invalid credentials", 401, "UNAUTHENTICATED");
  }

  await saveSession(req, user._id.toString());

  return {
    message: "User logged in successfully",
    userData: {
      name: user.name,
      email: user.email,
    },
  };
};

// Log out a user.
export const logoutService = async (req) => {
  await revokeSession(req);
};
