import jwt from "jsonwebtoken";
import { User } from "../types/user-session.type";

export const signToken = (payload: User): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.EXPIRES_IN),
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
