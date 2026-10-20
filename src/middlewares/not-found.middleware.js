import ApiError from "../utils/errors.js";

const notFoundHandler = (req, res, next) => {
  next(
    new ApiError(
      `Cannot ${req.method} ${req.originalUrl}`,
      404,
      "ROUTE_NOT_FOUND",
    ),
  );
};

export default notFoundHandler;
