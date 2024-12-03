import { Router } from "express";
import { validateSessionMiddleware } from "../middlewares/validateSessionMiddleware";
import {
  protectedWithSession,
  protectedWithToken,
} from "../controllers/protected.controller";
import { validateJWTMiddleware } from "../middlewares/validateJWTMiddleware";

const router = Router();

router.get("/session", validateSessionMiddleware, protectedWithSession);

router.get("/token", validateJWTMiddleware, protectedWithToken);

export default router;
