import { Router } from "express";
import userRoutes from "./api/users";
import authRoutes from "./api/auth";
import bikePointsRoutes from "./api/bikePoints";

const apiV1Router = Router();

apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/users", userRoutes);
apiV1Router.use("/bikePoints", bikePointsRoutes);

export default apiV1Router;
