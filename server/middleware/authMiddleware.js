import { UnauthenticatedError } from "../utils/customErrors.js";
import { verifyJwtToken } from "../utils/tokenUtils.js";

// Check if user is logged in and authenticated to restrict access
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
