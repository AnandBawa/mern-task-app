import { Router } from "express";
import { getCurrentUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.route("/current-user").get(getCurrentUser);

export default userRouter;
