//TODO: refactor: extract business logic into services / workers
import { Request, Response } from "express";
import fetchTflData from "../../utils/fetchTflData";

interface BikePointsHandler {
  getAllBikePointsData(req: Request, res: Response): Promise<void>;
}

const bikePointsHandler: BikePointsHandler = {
  getAllBikePointsData: async (req: Request, res: Response): Promise<void> => {
    const bikePointsData = await fetchTflData();
    console.log(`Received request from ${req.ip}`);
    res.status(200).json({ bikePointsData });
  },
};

export default bikePointsHandler;
