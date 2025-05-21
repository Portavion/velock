//TODO: refactor: extract business logic into services / workers
import { NextFunction, Request, Response } from "express";
import fetch, { Response as FetchResponse } from "node-fetch";
import fetchTflData from "../../utils/fetchTflData.js";
import { PrismaClient } from "@prisma/client";
import { TFL_CACHE } from "../../utils/tflCache.js";
import { updateBikePointsTable } from "../../prisma/populateBikepoints.js";
const prisma = new PrismaClient();

interface BikePointsHandler {
  getAllBikePointsData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getBikePointData(
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
      //TODO: refactor proper export
      res.status(200).json(bikePointsData);
      return;
    } catch (error) {
      next(error);
    }
  },

  getBikePointData: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    const bikePointId = String(req.query.id);

    if (bikePointId && TFL_CACHE && TFL_CACHE.has(bikePointId)) {
      res.status(200).json(TFL_CACHE.get(bikePointId));
      return;
    }
  },

  getBikePointByAdress: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // if the query is less than 7 character, it's likely a postcode which does't return good results with London appended
    const address =
      String(req.query.address).length <= 7
        ? req.query.address
        : req.query.address + "+london";

    const fetchCoordUrl = `https://nominatim.openstreetmap.org/search.php?q=${address}&countrycodes=gb&format=json`;
    let latitude: number;
    let longitude: number;
    const limit: number = 5;

    try {
      const geocodingResponse: FetchResponse = await fetch(fetchCoordUrl);
      const geocodingResults = (await geocodingResponse.json()) as {
        lat: number | undefined;
        lon: number | undefined;
      }[];

      const bestGeocodingResult = geocodingResults[0];

      if (!bestGeocodingResult) {
        res.status(400).json("No station found");
        return;
      }
      latitude = Number(bestGeocodingResult.lat);
      longitude = Number(bestGeocodingResult.lon);

      try {
        updateBikePointsTable();
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
        res.status(200).json(closestBikePoints);
        return;
      } catch (error) {
        next(error);
      }
    } catch (error: unknown) {
      next(error);
    }
  },
};

export default bikePointsHandler;
