import session from "express-session";
import { setupRedisStore } from "./redis";

export const sessionConfig = async () => {
  const redisStore = await setupRedisStore();

  return session({
    store: redisStore,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: Number(process.env.EXPIRES_IN) * 1000,
    },
  });
};
