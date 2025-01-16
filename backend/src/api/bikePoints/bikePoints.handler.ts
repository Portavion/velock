//TODO: refactor: extract business logic into services / workers
import { NextFunction, Request, Response } from "express";
import fetchTflData from "../../utils/fetchTflData";

interface BikePointsHandler {
  getAllBikePointsData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}

const bikePointsHandler: BikePointsHandler = {
  getAllBikePointsData: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const bikePointsData = await fetchTflData();
      console.log(`Received request from ${req.ip}`);
      res.status(200).json({ bikePointsData });
    } catch (error) {
      next(error);
    }
  },
};

export default bikePointsHandler;
