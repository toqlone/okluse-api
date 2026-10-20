import * as yup from "yup";
import ApiError from "../utils/errors.js";

/**
 * Validates request data.
 * @param {Object} schema
 * @param {"body" | "query" | "params"} type
 * @returns {import("express").RequestHandler}
 */
const validate = (schema, type) => {
  return async (req, res, next) => {
    try {
      const validatedData = await schema[type].validate(req[type], {
        abortEarly: false,
      });

      res.locals.validated = res.locals.validated ?? {};
      res.locals.validated[type] = validatedData;

      return next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = error.inner.length ? error.inner : [error];

        const errors = validationErrors.map((err) => ({
          field: err.path || type,
          reason: err.message,
        }));

        return next(
          new ApiError("Validation failed", 422, "VALIDATION_ERROR", errors),
        );
      }

      return next(error);
    }
  };
};

export default validate;
