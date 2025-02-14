import fetch from "node-fetch";
import fetchTflData from "../../utils/fetchTflData.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bikePointsHandler = {
    getAllBikePointsData: async (_req, res, next) => {
        try {
            const bikePointsData = await fetchTflData();
            res.status(200).json(bikePointsData);
            return;
        }
        catch (error) {
            next(error);
        }
    },
    getBikePointData: async (req, res, next) => {
        const bikePointId = String(req.query.id);
        if (bikePointId) {
            try {
                const bikePointData = await prisma.bikePoint.findUnique({
                    where: { id: bikePointId },
                });
                res.status(200).json(bikePointData);
                return;
            }
            catch (error) {
                next(error);
            }
        }
    },
    getBikePointByAdress: async (req, res, next) => {
        const address = String(req.query.address).length <= 7
            ? req.query.address
            : req.query.address + "+london";
        const fetchCoordUrl = `https://nominatim.openstreetmap.org/search.php?q=${address}&countrycodes=gb&format=json`;
        let latitude;
        let longitude;
        const limit = 5;
        try {
            const geocodingResponse = await fetch(fetchCoordUrl);
            const geocodingResults = (await geocodingResponse.json());
            const bestGeocodingResult = geocodingResults[0];
            if (!bestGeocodingResult) {
                res.status(400).json("No station found");
                return;
            }
            latitude = Number(bestGeocodingResult.lat);
            longitude = Number(bestGeocodingResult.lon);
            try {
                const closestBikePoints = await prisma.$queryRaw `
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
            }
            catch (error) {
                next(error);
            }
        }
        catch (error) {
            next(error);
        }
    },
};
export default bikePointsHandler;
