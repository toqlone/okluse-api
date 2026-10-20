import argon2 from "argon2";

export const hashPassword = async (plainPassword) => {
  return argon2.hash(plainPassword);
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword);
};
