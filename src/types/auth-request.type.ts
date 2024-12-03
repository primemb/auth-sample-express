import { Request } from "express";
import { User } from "./user-session.type";

export interface AuthenticatedRequest extends Request {
  user?: User;
}
