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
  "/name",
  authenticate,
  bikePointsListsHandler.updateBikePointsListName,
);

bikePointsListsRoutes.put(
  "/",
  authenticate,
  bikePointsListsHandler.updateBikePointsListAdd,
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
