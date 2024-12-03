import { NextFunction, Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import User from "../models/User";
import { signToken } from "../utils/jwt";
import { HTTPError } from "../models/HttpError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new HTTPError(400, "User already exists"));
    }

    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = signToken({ id: user._id.toString(), email: user.email });

    req.session.user = {
      email: user.email,
      id: user._id.toString(),
    };

    return res
      .status(201)
      .json({ token, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return next(new HTTPError(500, "Server error"));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new HTTPError(400, "Invalid credentials"));
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return next(new HTTPError(400, "Invalid credentials"));
    }

    const token = signToken({ id: user._id.toString(), email: user.email });

    req.session.user = {
      email: user.email,
      id: user._id.toString(),
    };

    return res.status(200).json({ token, message: "Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    return next(new HTTPError(500, "Server error"));
  }
};

export const me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = req.session.user;
    if (!user) {
      return next(new HTTPError(404, "User not found"));
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Me error:", error);
    return next(new HTTPError(500, "Server error"));
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return reject(new HTTPError(500, "Server error"));
      }

      return resolve(
        res.status(200).json({ message: "Logged out successfully" })
      );
    });
  });
};
