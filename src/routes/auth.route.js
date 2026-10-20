import express from "express";
import validate from "../middlewares/validation.middleware.js";
import limiter from "../middlewares/rate-limit.middleware.js";

import { registerSchema, loginSchema } from "../validators/auth.validator.js";

import {
  getMe,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

import authenticate from "../middlewares/authentication.middleware.js";

const router = express.Router();

// Routes
router.get("/me", authenticate, getMe);
router.post(
  "/register",
  limiter("register"),
  validate(registerSchema, "body"),
  registerUser,
);
router.post(
  "/login",
  limiter("login"),
  validate(loginSchema, "body"),
  loginUser,
);
router.post("/logout", logoutUser);

export default router;
