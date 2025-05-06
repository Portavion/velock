import fetchTflData from "../utils/fetchTflData.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function formatBikePointData() {
    try {
        const bikePointsData = await fetchTflData();
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
async function checkBikePoint(bikePointId) {
    let bikePoint = null;
    try {
        bikePoint = await prisma.bikePoint.findUnique({
            where: {
                id: bikePointId,
            },
        });
    }
    catch (error) {
        console.log(error);
        return false;
    }
    return bikePoint ? true : false;
}
async function createBikePoint(bikePoint) {
    try {
        await prisma.bikePoint.create({
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
        console.log(`${Date.now()}: Created bikePoint ${bikePoint.id}`);
    }
    catch (error) {
        console.log(`${Date.now()}: Error creating bikePoint: ${error}`);
        return false;
    }
    return true;
}
async function populateBikePointsTable() {
    const data = await formatBikePointData();
    if (data) {
        for (let bikePoint of data) {
            createBikePoint(bikePoint);
        }
        console.log(`${Date.now()} BikePoint Table populated`);
    }
    else {
        console.log("No data for populating BikePoint Table");
    }
}
async function updateBikePointsTable() {
    const data = await formatBikePointData();
    const isPopulated = (await prisma.bikePoint.count()) ? true : false;
    if (!isPopulated) {
        try {
            await populateBikePointsTable();
        }
        catch (error) {
            throw new Error(`${Date.now()}: Error populating the docking station table`);
        }
    }
    else if (!data) {
        console.log(`${Date.now()} Data undefined:`);
        console.log(data);
    }
    else {
        for (let bikePoint of data) {
            let isExisting;
            try {
                isExisting = await checkBikePoint(bikePoint.id);
                if (!isExisting) {
                    console.log(`${Date.now()}: §Bikepoint ${bikePoint.id} existing: ${isExisting}`);
                }
                if (!isExisting) {
                    const res = await createBikePoint(bikePoint);
                    console.log(`${Date.now()}: Created bikePoint: ${res}`);
                }
                await prisma.bikePoint.update({
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
                console.log(`${Date.now()}Error at bikePoint: ${bikePoint.id} exist? ${isExisting}`);
                console.log(error);
            }
        }
        console.log(`${Date.now()} Bikepoint table updated`);
    }
}
export { updateBikePointsTable };
