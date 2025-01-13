import { Router } from "express";
import userRouter from "./userRouter";

const apiV1Router = Router();

apiV1Router.use("/users", userRouter);

export default apiV1Router;
