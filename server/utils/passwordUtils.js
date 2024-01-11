import argon2 from "argon2";

// use argon2 to hash and compare password

export const hashPassword = async (password) => {
  return await argon2.hash(password);
};

export const comparePassword = async (hashedPassword, password) => {
  const isMatch = await argon2.verify(hashedPassword, password);
  return isMatch;
};
