import { Router } from "express";
import userRoutes from "./api/users/index.js";
import authRoutes from "./api/auth/index.js";
import bikePointsRoutes from "./api/bikePoints/index.js";
import bikePointsListsRoutes from "./api/bikePointsLists/index.js";

const apiV1Router = Router();

apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/users", userRoutes);
apiV1Router.use("/bikepoints", bikePointsRoutes);
apiV1Router.use("/bikepointslists", bikePointsListsRoutes);

export default apiV1Router;
