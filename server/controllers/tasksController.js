import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import User from "../models/UserModel.js";
import { BadRequestError } from "../utils/customErrors.js";

// Create a new task after validation
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (
    !title ||
    !description ||
    title?.trim() === "" ||
    title?.trim().length < 3 ||
    title?.trim().length > 15 ||
    description?.trim() === "" ||
    description?.trim().length < 3 ||
    description?.trim().length > 100
  ) {
    throw new BadRequestError("Invalid Data");
  }

  const user = await User.findById(req.user.userId);

  const newTask = {
    title: title.trim(),
    description: description.trim(),
  };

  if (user.tasks.length < 30) {
    await User.findByIdAndUpdate(req.user.userId, {
      $push: {
        tasks: newTask,
      },
    });

    res.status(StatusCodes.CREATED).json({ message: "Task Added" });
  } else {
    throw new BadRequestError("Limit of 30 tasks");
  }
};

// Clear all tasks
export const deleteAllTasks = async (req, res) => {
  await User.findByIdAndUpdate(req.user.userId, { $set: { tasks: [] } });

  res.status(StatusCodes.OK).json({ message: "All Tasks Deleted" });
};

// Update a task after validation
export const editTask = async (req, res) => {
  const { id } = req.params;

  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) throw new BadRequestError("Invalid MongoDB ID");

  const { title, description, completed } = req.body;

  if (
    !title ||
    !description ||
    title?.trim() === "" ||
    title?.trim().length < 3 ||
    title?.trim().length > 15 ||
    description?.trim() === "" ||
    description?.trim().length < 3 ||
    description?.trim().length > 100 ||
    typeof completed !== "boolean"
  ) {
    throw new BadRequestError("Invalid Data");
  }

  const updatedTask = {
    title: title.trim(),
    description: description.trim(),
    completed,
  };

  const task = await User.updateOne(
    { "tasks._id": id },
    { "tasks.$": updatedTask }
  );

  if (task.modifiedCount) {
    res.status(StatusCodes.OK).json({ message: "Task Updated" });
  } else {
    throw new BadRequestError("Invalid request");
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) throw new BadRequestError("Invalid MongoDB ID");

  const task = await User.findOneAndUpdate(
    { "tasks._id": id },
    {
      $pull: { tasks: { _id: id } },
    }
  );

  if (task) {
    res.status(StatusCodes.OK).json({ message: "Task Deleted" });
  } else {
    throw new BadRequestError("Invalid request");
  }
};
