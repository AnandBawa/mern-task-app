import { Router } from "express";
import { getCurrentUser } from "../controllers/userController.js";

const userRouter = Router();

// Grab the current user after successful authentication
userRouter.route("/current-user").get(getCurrentUser);

export default userRouter;
