import { StatusCodes } from "http-status-codes";

// Error handling middleware that handles custom errors and responses
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong. Try again later.";

  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
