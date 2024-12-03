import { NextFunction, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { HTTPError } from "../models/HttpError";
import { AuthenticatedRequest } from "../types/auth-request.type";
import { User } from "../types/user-session.type";

export const validateJWTMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyToken(token) as User;

      req.user = { id: decoded.id, email: decoded.email };

      next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return next(new HTTPError(401, "Invalid or expired token"));
    }
  } else {
    return next(new HTTPError(401, "No token provided"));
  }
};
