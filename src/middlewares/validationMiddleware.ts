import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HTTPError } from "../models/HttpError";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    return next(new HTTPError(400, errors.array()[0].msg));
  }
  next();
};
