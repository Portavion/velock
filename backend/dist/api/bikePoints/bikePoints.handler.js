"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchTflData_1 = __importDefault(require("../../utils/fetchTflData"));
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const bikePointsHandler = {
    getAllBikePointsData: async (_req, res, next) => {
        try {
            const bikePointsData = await (0, fetchTflData_1.default)();
            res.status(200).json(bikePointsData);
        }
        catch (error) {
            next(error);
        }
    },
    getBikePointData: async (req, res, next) => {
        const bikePointId = String(req.query.id);
        if (bikePointId) {
            try {
                const bikePointData = await prisma_1.default.bikePoint.findUnique({
                    where: { id: bikePointId },
                });
                res.status(200).json(bikePointData);
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
            const geocodingResponse = await (0, node_fetch_1.default)(fetchCoordUrl);
            const geocodingResults = (await geocodingResponse.json());
            const bestGeocodingResult = geocodingResults[0];
            if (!bestGeocodingResult) {
                res.status(400).json("No station found");
                return;
            }
            latitude = Number(bestGeocodingResult.lat);
            longitude = Number(bestGeocodingResult.lon);
            try {
                const closestBikePoints = await prisma_1.default.$queryRaw `
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
exports.default = bikePointsHandler;
