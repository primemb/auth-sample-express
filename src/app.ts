import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.routes";
import { sessionConfig } from "./config/session";
import { errorHandler } from "./middlewares/errorHandler";
import connectDB from "./config/db";
import { User } from "./types/user-session.type";

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

async function bootstrap() {
  try {
    dotenv.config();

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await connectDB();

    const sessionMiddleware = await sessionConfig();
    // Middleware
    app.use(sessionMiddleware);

    // Routes
    app.use(routes);

    //error handling
    app.use(errorHandler);

    app.listen(process.env.PORT ?? 3000, () => {
      console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
    });
  } catch (error) {
    console.error("Failed to bootstrap application:", error);
    throw error;
  }
}

bootstrap();
