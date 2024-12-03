import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validationMiddleware";
import { login, register, me, logout } from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validate,
  register
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").exists().withMessage("Password is required"),
  validate,
  login
);

router.post("/logout", logout);

router.get("/me", me);

export default router;
