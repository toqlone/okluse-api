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
 * Checks error type.
 * @param {Error & { type?: string, status?: number }} err
 * @param {"MalformedJson"} errorType
 * @returns {boolean}
 */
export const errorCheck = (err, errorType) => {
  return (
    errorType === "MalformedJson" &&
    err?.type === "entity.parse.failed" &&
    err?.status === 400
  );
};
