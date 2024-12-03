import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/auth-request.type";

export const protectedWithSession = async (
  req: Request,
  res: Response
): Promise<any> => {
  return res.json({
    user: req.session?.user,
  });
};

export const protectedWithToken = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<any> => {
  return res.json({
    user: req.user,
  });
};
