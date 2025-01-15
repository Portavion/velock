import { Router } from "express";
import userRoutes from "./api/users";
import authRoutes from "./api/auth";

const apiV1Router = Router();

apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/users", userRoutes);

export default apiV1Router;
