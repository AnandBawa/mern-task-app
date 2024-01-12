import { Router } from "express";
import rateLimiter from "express-rate-limit";
import { login, logout, register } from "../controllers/authController.js";

const authRouter = Router();

// Rate limit routes to prevent abuse
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: { message: "IP rate limit exceeded. Retry in 15 minutes" },
  validate: { xForwardedForHeader: false },
});

// Register
authRouter.route("/register").post(apiLimiter, register);

// Login
authRouter.route("/login").post(apiLimiter, login);

// Logout
authRouter.route("/logout").post(logout);

export default authRouter;
