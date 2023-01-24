import { ErrorRequestHandler } from "express";
import env from "../config/env";

const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  const errStatus = error.statusCode || 500;
  const errMsg = error.message || "Something went wrong";
  response.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: env.NODE_ENV === "development" ? error.stack : {},
  });
};

export default errorHandler;
