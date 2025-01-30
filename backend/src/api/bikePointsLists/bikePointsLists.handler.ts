//TODO: refactor: extract business logic into services / workers
import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import {
  createBikePointsList,
  selectAllBikePointsLists,
  deleteBikePointsList,
  updateBikePointsListName,
  updateBikePointsListAdd,
  deleteBikePoint,
} from "./bikePointsLists.db.js";
import isUserExists from "../../utils/isUserExists.js";

interface BikePointsListsHandler {
  getAllBikePointsLists(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  createBikePointsList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  updateBikePointsListName(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  updateBikePointsListAdd(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteBikePointsList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteBikePoint(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}

const bikePointsListsHandler: BikePointsListsHandler = {
  getAllBikePointsLists: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const user: User = req.user as User;

    if (!user) {
      res.status(401).json({
        message: "Error: List creation requires a name and a user id ",
      });
    }

    const userId: number = Number(user.id);

    try {
      const bikePointsLists = await selectAllBikePointsLists(userId);
      res.status(200).json(bikePointsLists);
    } catch (error) {
      next(error);
    }
  },

  createBikePointsList: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const listName: string = req.body.listName;
    const user: User = req.user as User;

    if (!listName || !user) {
      res.status(401).json({
        message: "Error: List creation requires a name and a user id ",
      });
    }

    const isUserExist = await isUserExists(user?.id);

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Adding lists requires to be logged.",
      });
    } else {
      try {
        const newBikePointList = await createBikePointsList(listName, user?.id);
        res.status(200).json(newBikePointList);
      } catch (error) {
        next(error);
      }
    }
  },

  updateBikePointsListName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const listName: string = req.body.listName;
    const user: User = req.user as User;
    const listId: number = parseInt(req.body.listId);
    const bikePointsList: Array<string> = req.body.bikePointsList || [];

    if (!listName || !user) {
      res.status(401).json({
        message: "Error: List creation requires a name and a user id ",
      });
    }

    const isUserExist = await isUserExists(user?.id);

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Updating lists requires to be logged.",
      });
    } else {
      try {
        const updatedBikePointList = await updateBikePointsListName(
          listId,
          listName,
          bikePointsList.length >= 1 ? bikePointsList : [],
        );
        res.status(200).json(updatedBikePointList);
      } catch (error) {
        next(error);
      }
    }
  },

  updateBikePointsListAdd: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const user: User = req.user as User;
    const listId: number = Number(req.body.listId);
    const bikePoint: string = req.body.bikePoint || "";

    if (!listId || !user || !bikePoint) {
      res.status(401).json({
        message:
          "Error: List creation requires a bike point list and a user id ",
      });
    }

    const isUserExist = await isUserExists(user?.id);

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Updating lists requires to be logged.",
      });
    } else {
      try {
        const updatedBikePointList = await updateBikePointsListAdd(
          listId,
          bikePoint,
        );
        res.status(200).json(updatedBikePointList);
      } catch (error) {
        next(error);
      }
    }
  },

  deleteBikePointsList: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const listId: number = Number(req.body.listId);
    const user: User = req.user as User;

    if (!listId || !user) {
      res.status(401).json({
        message: "Error: List creation requires an id and a user id ",
      });
    }

    const isUserExist = await isUserExists(user?.id);

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Adding lists requires to be logged.",
      });
    } else {
      try {
        const deletedBikePointList = await deleteBikePointsList(
          listId,
          user?.id,
        );
        res.status(200).json(deletedBikePointList);
      } catch (error) {
        next(error);
      }
    }
  },
  deleteBikePoint: async (req, res, next): Promise<void> => {
    const listId: number = Number(req.body.listId);
    const bikePointName = req.body.bikePoint;
    const user = req.user as User;

    if (!listId || !user || !bikePointName) {
      res.status(401).json({
        message: "Error: List creation requires an id and a user id ",
      });
    }

    const isUserExist = await isUserExists(user?.id);

    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Adding lists requires to be logged.",
      });
    } else {
      try {
        const deletedBikePoint = await deleteBikePoint(listId, bikePointName);
        res.status(200).json(deletedBikePoint);
      } catch (error) {
        next(error);
      }
    }
  },
};

export default bikePointsListsHandler;
