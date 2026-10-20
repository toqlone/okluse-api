class ApiError extends Error {
  constructor(message, statusCode, code, details = [], operational = true) {
    super(message);

    this.name = new.target.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.operational = operational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, new.target);
  }
}

export default ApiError;

/**
 * Checks the type of an error.
 *
 * @param {Error & { type?: string, status?: number }} err
 * @param {"MalformedJson" | "PayloadTooLarge"} errorType
 * @returns {boolean}
 */
export const errorCheck = (err, errorType) => {
  if (errorType === "MalformedJson") {
    return err?.type === "entity.parse.failed" && err?.status === 400;
  }

  if (errorType === "PayloadTooLarge") {
    return err?.type === "entity.too.large" && err?.status === 413;
  }

  return false;
};
