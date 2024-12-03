import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const isValidErrorCode = error?.code >= 100 && error.code <= 500;
  res.status(isValidErrorCode ? error.code : 500);
  res.json({
    result: "error",
    message: error.message || "An unknown error occurred!",
  });
};
