import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import User from "../models/UserModel.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../utils/customErrors.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJwtToken } from "../utils/tokenUtils.js";

// Register a new user after successful validation
export const register = async (req, res) => {
  const userInput = req.body;

  const validateUserInput = z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .regex(/^[a-zA-Z]{3,20}$/, {
        message: "Name should be between 3 to 15 alphabets",
      }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: "Invalid Email",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        {
          message:
            "Password should be between 8 to 20 characters. Combination of alphanumeric and special characters. Special characters: !, @, #, $, %, ^, &, or *. At-least one uppercase alphabet, one lowercase alphabet, one digit, and one special character",
        }
      ),
  });

  const result = validateUserInput.safeParse(userInput);
  if (!result.success) {
    const errors = result.error;
    const msg = errors.issues.map((issue) => issue.message).join(". ");
    throw new BadRequestError(msg);
  }

  userInput.email = userInput.email.toLowerCase();
  userInput.name = userInput.name.at(0).toUpperCase() + userInput.name.slice(1);

  const userExists = await User.findOne({ email: userInput.email });
  if (userExists) throw new BadRequestError("Email already exists");

  userInput.password = await hashPassword(userInput.password);
  const user = await User.create(userInput);

  res.status(StatusCodes.CREATED).json({ message: "Account Created" });
};

// Login user after successful validation and create a JWT token and set as cookie
export const login = async (req, res) => {
  const userInput = req.body;

  const validateUserInput = z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: "Invalid Email",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, { message: "Password cannot be blank" })
      .max(20, { message: "Password must be 20 or fewer characters long" }),
  });

  const result = validateUserInput.safeParse(userInput);
  if (!result.success) {
    const errors = result.error;
    const msg = errors.issues.map((issue) => issue.message).join(". ");
    throw new BadRequestError(msg);
  }

  userInput.email = userInput.email.toLowerCase();

  const user = await User.findOne({ email: userInput.email });
  if (!user) throw new UnauthenticatedError("Invalid Credentials");

  const isMatch = await comparePassword(user.password, userInput.password);
  if (!isMatch) throw new UnauthenticatedError("Invalid Credentials");

  const token = createJwtToken({ userId: user._id });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  console.log(`${user.email} logged in`);

  res.status(StatusCodes.OK).json({ message: `Welcome back, ${user.name}` });
};

// Logout user by expiring token immediately
export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ message: "Log Out Successful" });
};
