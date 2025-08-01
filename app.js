import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subRouter from "./routes/subscription.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  await connectToDatabase();
});
