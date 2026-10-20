import env from "../configs/env.js";

import {
  registerService,
  loginService,
  logoutService,
} from "../services/auth.service.js";

// Register a new user.
export const registerUser = async (req, res) => {
  const reqData = res.locals.validated.body;

  const { message, userData } = await registerService(reqData);

  res.status(201).json({
    message,
    data: {
      user: userData,
    },
  });
};

// Log in a user.
export const loginUser = async (req, res) => {
  const reqData = res.locals.validated.body;

  const { message, userData } = await loginService(req, reqData);

  res.status(200).json({
    message,
    data: {
      user: userData,
    },
  });
};

// Log out a user.
export const logoutUser = async (req, res) => {
  await logoutService(req);

  res.clearCookie("app.sid", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.sendStatus(204);
};

// Get authenticated user's profile.
export const getMe = async (req, res) => {
  res.status(200).json({
    message: "User profile fetched successfully",
    data: {
      user: req.user,
    },
  });
};
