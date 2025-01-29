"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBikePointsTable = updateBikePointsTable;
const fetchTflData_1 = __importDefault(require("../utils/fetchTflData"));
const prisma_1 = __importDefault(require("./prisma"));
async function formatBikePointData() {
    try {
        const bikePointsData = await (0, fetchTflData_1.default)();
        let bikePointsDataStripped = undefined;
        if (bikePointsData) {
            bikePointsDataStripped = bikePointsData.map((bikePoint) => ({
                id: bikePoint.id,
                commonName: bikePoint.commonName,
                locked: bikePoint.locked,
                NbBikes: Number(bikePoint.additionalProperties.find((property) => property.key === "NbBikes")?.value),
                NbEmptyDocks: Number(bikePoint.additionalProperties.find((property) => property.key === "NbEmptyDocks")?.value),
                NbDocks: Number(bikePoint.additionalProperties.find((property) => property.key === "NbDocks")?.value),
                NbStandardBikes: Number(bikePoint.additionalProperties.find((property) => property.key === "NbStandardBikes")?.value),
                NbEBikes: Number(bikePoint.additionalProperties.find((property) => property.key === "NbEBikes")?.value),
                lat: bikePoint.lat,
                lon: bikePoint.lon,
            }));
        }
        return bikePointsDataStripped;
    }
    catch (error) {
        console.log(error);
        return;
    }
}
async function populateBikePointsTable() {
    const data = await formatBikePointData();
    if (data) {
        for (let bikePoint of data) {
            try {
                await prisma_1.default.bikePoint.create({
                    data: {
                        id: bikePoint.id,
                        commonName: bikePoint.commonName,
                        locked: bikePoint.locked,
                        NbBikes: bikePoint.NbBikes,
                        NbEmptyDocks: bikePoint.NbEmptyDocks,
                        NbDocks: bikePoint.NbDocks,
                        NbStandardBikes: bikePoint.NbStandardBikes,
                        NbEbikes: bikePoint.NbEBikes,
                        lat: bikePoint.lat,
                        lon: bikePoint.lon,
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    else {
        console.log("something went wrong when populating BikePoint table");
    }
}
async function updateBikePointsTable() {
    const data = await formatBikePointData();
    const isPopulated = (await prisma_1.default.bikePoint.count()) ? true : false;
    if (!isPopulated) {
        try {
            await populateBikePointsTable();
        }
        catch (error) {
            throw new Error("Error populating the docking station table");
        }
    }
    else if (!data) {
        console.log("Data undefined:");
        console.log(data);
    }
    else {
        for (let bikePoint of data) {
            try {
                await prisma_1.default.bikePoint.update({
                    where: { id: bikePoint.id },
                    data: {
                        id: bikePoint.id,
                        commonName: bikePoint.commonName,
                        locked: bikePoint.locked,
                        NbBikes: bikePoint.NbBikes,
                        NbEmptyDocks: bikePoint.NbEmptyDocks,
                        NbDocks: bikePoint.NbDocks,
                        NbStandardBikes: bikePoint.NbStandardBikes,
                        NbEbikes: bikePoint.NbEBikes,
                        lat: bikePoint.lat,
                        lon: bikePoint.lon,
                    },
                });
            }
            catch (error) {
                console.log(error);
                console.log(`Error at bikePoint: ${bikePoint.id}`);
            }
        }
    }
}
