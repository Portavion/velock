import { Router } from "express";
const bikePointsRoutes = Router();
import bikePointsHandler from "./bikePoints.handler.js";
import { authenticate } from "../../middleware/middlewares.js";
bikePointsRoutes.get("/searchAddress", authenticate, bikePointsHandler.getBikePointByAdress);
bikePointsRoutes.get("/:id", authenticate, bikePointsHandler.getBikePointData);
bikePointsRoutes.get("/", authenticate, bikePointsHandler.getAllBikePointsData);
export default bikePointsRoutes;
