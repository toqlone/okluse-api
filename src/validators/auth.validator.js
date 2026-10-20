import * as yup from "yup";

// ─── FIELDS ─────────
const name = yup
  .string("Name must be a string")
  .test("original-type", "Name must be a string", function () {
    return typeof this.originalValue === "string";
  })
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name cannot exceed 100 characters")
  .required("Name is required");

const email = yup
  .string("Email must be a string")
  .test("original-type", "Email must be a string", function () {
    return typeof this.originalValue === "string";
  })
  .trim()
  .lowercase()
  .email("Provide a valid email address")
  .max(254, "Email cannot exceed 254 characters")
  .required("Email is required");

const registerPassword = yup
  .string("Password must be a string")
  .strict()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password cannot exceed 128 characters")
  .required("Password is required");

const loginPassword = yup
  .string("Password must be a string")
  .strict()
  .max(128, "Password cannot exceed 128 characters")
  .required("Password is required");

// ─── SCHEMAS ─────────
export const registerSchema = {
  body: yup
    .object({
      name,
      email,
      password: registerPassword,
    })
    .default(undefined)
    .required("Register user data is required")
    .stripUnknown(),
};

export const loginSchema = {
  body: yup
    .object({
      email,
      password: loginPassword,
    })
    .default(undefined)
    .required("Login data is required")
    .stripUnknown(),
};
