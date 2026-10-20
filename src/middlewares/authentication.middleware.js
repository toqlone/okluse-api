import User from "../models/user.model.js";
import ApiError from "../utils/errors.js";

const authenticate = async (req, res, next) => {
  try {
    if (!req.session?.userId) {
      return next(
        new ApiError("Invalid or expired session", 401, "UNAUTHENTICATED"),
      );
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return next(
        new ApiError("Invalid or expired session", 401, "UNAUTHENTICATED"),
      );
    }

    req.user = {
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    return next(error);
  }
};

export default authenticate;
