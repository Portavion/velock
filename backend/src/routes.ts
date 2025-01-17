import { Router } from "express";
import userRoutes from "./api/users";
import authRoutes from "./api/auth";
import bikePointsRoutes from "./api/bikePoints";
import bikePointsListsRoutes from "./api/bikePointsLists";

const apiV1Router = Router();

apiV1Router.use("/auth", authRoutes);
apiV1Router.use("/users", userRoutes);
apiV1Router.use("/bikepoints", bikePointsRoutes);
apiV1Router.use("/bikepointslists", bikePointsListsRoutes);

export default apiV1Router;
