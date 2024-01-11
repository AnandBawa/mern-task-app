import { Router } from "express";

const taskRouter = Router();

import {
  createTask,
  editTask,
  deleteTask,
  deleteAllTasks,
} from "../controllers/tasksController.js";

taskRouter.route("/").post(createTask).patch(deleteAllTasks);

taskRouter.route("/:id").patch(editTask).delete(deleteTask);

export default taskRouter;
