import { Router } from "express";

const taskRouter = Router();

import {
  createTask,
  editTask,
  deleteTask,
  deleteAllTasks,
  mockTasks,
} from "../controllers/tasksController.js";

// Create a new task or delete all tasks
taskRouter.route("/").post(createTask).put(mockTasks).patch(deleteAllTasks);

// Modify a task or delete one
taskRouter.route("/:id").patch(editTask).delete(deleteTask);

export default taskRouter;
