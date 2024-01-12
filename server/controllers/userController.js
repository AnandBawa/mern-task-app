import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

// Get currently logged-in user details after successful authentication
export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res
    .status(StatusCodes.OK)
    .json({ name: user.name, email: user.email, tasks: user.tasks });
};
