import { UnauthenticatedError } from "../utils/customErrors.js";
import { verifyJwtToken } from "../utils/tokenUtils.js";

export const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError("Authentication invalid");

  try {
    const { userId } = verifyJwtToken(token);
    req.user = { userId };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
