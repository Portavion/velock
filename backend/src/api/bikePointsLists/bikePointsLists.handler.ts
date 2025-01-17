//TODO: refactor: extract business logic into services / workers
import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
import {
  createBikePointsList,
  selectAllBikePointsLists,
  deleteBikePointsList,
  updateBikePointsList,
} from "./bikePointsLists.db";
import isUserExists from "../../utils/isUserExists";

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
  updateBikePointsList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteBikePointsList(
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
      console.log(bikePointsLists);
      res.status(200).json({ bikePointsLists });
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
        res.status(200).json({ newBikePointList });
      } catch (error) {
        next(error);
      }
    }
  },

  updateBikePointsList: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const listName: string = req.body.listName;
    const user: User = req.user as User;
    const listId: number = parseInt(req.body.listId);
    const bikePointsLists: Array<string> = req.body.bikePointsLists || [];

    console.log("list");
    console.log(bikePointsLists);
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
        const updatedBikePointList = await updateBikePointsList(
          listId,
          listName,
          bikePointsLists.length >= 1 ? bikePointsLists : [],
        );
        res.status(200).json({ updatedBikePointList });
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
    const listId: number = parseInt(req.body.listId);
    const user: User = req.user as User;

    if (!listId || !user) {
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
        const deletedBikePointList = await deleteBikePointsList(
          listId,
          user?.id,
        );
        res.status(200).json({ deletedBikePointList });
      } catch (error) {
        next(error);
      }
    }
  },
};

export default bikePointsListsHandler;
