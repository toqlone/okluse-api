import ApiError from "../utils/errors.js";
import { errorCheck } from "../utils/errors.js";

const errorHandler = (err, req, res, next) => {
  // Delegate if the response has already started.
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  let error = err;

  // Handle malformed JSON request bodies.
  if (errorCheck(err, "MalformedJson")) {
    error = new ApiError("Malformed JSON in request body", 400, "INVALID_JSON");
  }

  const isOperational = error instanceof ApiError && error.operational;
  const message = isOperational
    ? error.message
    : "An unexpected error occurred";

  const code = isOperational ? error.code : "INTERNAL_SERVER_ERROR";
  const statusCode = isOperational ? error.statusCode : 500;
  const details =
    isOperational && Array.isArray(error.details) && error.details.length > 0
      ? error.details
      : [];

  // Build a consistent API response.
  const response = {
    error: {
      code,
      message,
      ...(details.length > 0 && { details }),
    },
  };

  return res.status(statusCode).json(response);
};

export default errorHandler;
