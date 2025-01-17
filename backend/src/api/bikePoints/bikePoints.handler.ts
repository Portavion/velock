//TODO: refactor: extract business logic into services / workers
//TODO: extract tfl logic out of api / replace with own db query
import { NextFunction, Request, Response } from "express";
import fetch, { Response as FetchResponse } from "node-fetch";
import fetchTflData from "../../utils/fetchTflData";
import prisma from "../../prisma/prisma";

interface BikePointsHandler {
  getAllBikePointsData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getBikePointByAdress(
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

  getBikePointByAdress: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const address =
      String(req.query.address).length <= 7
        ? req.query.address
        : req.query.address + "+london";

    const fetchCoordUrl = `https://nominatim.openstreetmap.org/search.php?q=${address}&countrycodes=gb&format=json`;
    let latitude: number;
    let longitude: number;
    const limit: number = 10;

    try {
      const geocodingResponse: FetchResponse = await fetch(fetchCoordUrl);
      const geocodingResults = (await geocodingResponse.json()) as {
        lat: number;
        lon: number;
      }[];

      const bestGeocodingResult = geocodingResults[0];
      latitude = Number(bestGeocodingResult.lat);
      longitude = Number(bestGeocodingResult.lon);

      try {
        const closestBikePoints = await prisma.$queryRaw<any[]>`
SELECT *, 
       ST_Distance(
         ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
         ST_SetSRID(ST_MakePoint(lon, lat), 4326)
       ) as distance 
FROM "BikePoint" 
ORDER BY distance 
LIMIT ${limit};
    `;
        res.status(200).json({ closestBikePoints });
      } catch (error) {
        next(error);
      }
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default bikePointsHandler;
