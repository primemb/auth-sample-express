import { Request, Response, Router } from "express";
import authRouter from "./auth.routes";
import protectedRouter from "./protected.routes";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hi there!");
});

router.use("/auth", authRouter);
router.use("/protected", protectedRouter);

export default router;
