import { Router } from "express";
import userRouter from "../routes/userRouter";
import authRouter from "../routes/authRouter";

const apiV1Router = Router();

apiV1Router.use("/auth", authRouter);
apiV1Router.use("/users", userRouter);

export default apiV1Router;
