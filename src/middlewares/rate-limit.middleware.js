import { rateLimit } from "express-rate-limit";
import ApiError from "../utils/errors.js";

const typeConfigs = {
  global: {
    windowMs: 10 * 60 * 1000,
    limit: 100,
  },

  register: {
    windowMs: 15 * 60 * 1000,
    limit: 5,
  },

  login: {
    windowMs: 5 * 60 * 1000,
    limit: 5,
  },
};

/**
 * Creates a rate limiter for the specified type.
 * @param {"global" | "register" | "login"} type
 * @returns {import("express").RequestHandler}
 */
const limiter = (type = "global") => {
  const customOptions = typeConfigs[type];

  if (!customOptions) {
    throw new Error(
      `Rate limit type must be one of ${Object.keys(typeConfigs).join(", ")}`,
    );
  }

  return rateLimit({
    ...customOptions,
    standardHeaders: "draft-8",
    legacyHeaders: false,

    handler: (req, res, next, options) => {
      next(
        new ApiError(
          "Too many requests. Try again later",
          options.statusCode,
          "RATE_LIMIT_EXCEEDED",
        ),
      );
    },
    skip: (req) =>
      req.path === "/api" ||
      req.path === "/api/" ||
      /^\/api\/health(?:\/|$)/.test(req.path),
    validate: true,
  });
};

export default limiter;
