import { Router } from "express";
import bikePointsListsHandler from "./bikePointsLists.handler.js";
import { authenticate } from "../../middleware/middlewares.js";

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
  "/name",
  authenticate,
  bikePointsListsHandler.updateBikePointsListName,
);

bikePointsListsRoutes.put(
  "/add",
  authenticate,
  bikePointsListsHandler.updateBikePointsListAdd,
);

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
bikePointsListsRoutes.delete(
  "/name",
  authenticate,
  bikePointsListsHandler.deleteBikePoint,
);

export default bikePointsListsRoutes;
