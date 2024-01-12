import "express-async-errors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Routers
import authRouter from "./routes/authRouter.js";
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js";

// Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { isLoggedIn } from "./middleware/authMiddleware.js";

const app = express();

// MongoDB connection
const port = process.env.PORT || 3000;
try {
  await mongoose.connect(process.env.MONGO_DB_URL);
  app.listen(port, () => {
    console.log(`MongoDB Server connected on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", isLoggedIn, userRouter);
app.use("/api/v1/tasks", isLoggedIn, taskRouter);

// Direct to client front-end
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Handle 404 errors
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Handle remaining errors
app.use(errorHandlerMiddleware);
