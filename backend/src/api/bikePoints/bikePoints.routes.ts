import { Router } from "express";
const bikePointsRoutes = Router();

import bikePointsHandler from "./bikePoints.handler";
import { authenticate } from "../../middleware/middlewares";

// GET
bikePointsRoutes.get(
  "/searchAddress",
  authenticate,
  bikePointsHandler.getBikePointByAdress,
);
bikePointsRoutes.get("/:id", authenticate, bikePointsHandler.getBikePointData);
bikePointsRoutes.get("/", authenticate, bikePointsHandler.getAllBikePointsData);

//POST

//PUT

//DELETE

export default bikePointsRoutes;
