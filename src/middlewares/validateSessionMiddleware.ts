import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../models/HttpError";

export const validateSessionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session && req.session.user) {
    next();
  } else {
    next(new HTTPError(401, "Unauthorized"));
  }
};
