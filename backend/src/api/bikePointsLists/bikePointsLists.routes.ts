import { Router } from "express";
import bikePointsListsHandler from "./bikePointsLists.handler";
import { authenticate } from "../../middleware/middlewares";

const bikePointsListsRoutes = Router();

// GET
bikePointsListsRoutes.get(
  "/",
  authenticate,
  bikePointsListsHandler.getAllBikePointsLists,
);

//POST
bikePointsListsRoutes.post(
  "/",
  authenticate,
  bikePointsListsHandler.createBikePointsList,
);

//PUT
bikePointsListsRoutes.put(
  "/",
  authenticate,
  bikePointsListsHandler.updateBikePointsList,
);

//DELETE
bikePointsListsRoutes.delete(
  "/",
  authenticate,
  bikePointsListsHandler.deleteBikePointsList,
);

export default bikePointsListsRoutes;
