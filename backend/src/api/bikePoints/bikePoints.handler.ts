//TODO: refactor: extract business logic into services / workers
//TODO: extract tfl logic out of api / replace with own db query
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
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const bikePointsData = await fetchTflData();
      res.status(200).json({ bikePointsData });
    } catch (error) {
      next(error);
    }
  },
};

export default bikePointsHandler;
