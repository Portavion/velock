import { Router } from "express";
import userRouter from "../routes/userRouter";

const apiV1Router = Router();

apiV1Router.use("/api/v1/", userRouter);

export default apiV1Router;
