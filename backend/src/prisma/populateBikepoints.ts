import fetchTflData from "../utils/fetchTflData.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { BikePoint, BikePointTfL } from "../types";

//TODO: type for tfl response
async function formatBikePointData(): Promise<BikePoint[] | undefined> {
  try {
    const bikePointsData = await fetchTflData();
    let bikePointsDataStripped: BikePoint[] | undefined = undefined;

    if (bikePointsData) {
      bikePointsDataStripped = bikePointsData.map(
        (bikePoint: BikePointTfL) => ({
          id: bikePoint.id,
          commonName: bikePoint.commonName,
          locked: bikePoint.locked,
          NbBikes: Number(
            bikePoint.additionalProperties.find(
              (property) => property.key === "NbBikes",
            )?.value,
          ),
          NbEmptyDocks: Number(
            bikePoint.additionalProperties.find(
              (property) => property.key === "NbEmptyDocks",
            )?.value,
          ),
          NbDocks: Number(
            bikePoint.additionalProperties.find(
              (property) => property.key === "NbDocks",
            )?.value,
          ),
          NbStandardBikes: Number(
            bikePoint.additionalProperties.find(
              (property) => property.key === "NbStandardBikes",
            )?.value,
          ),
          NbEBikes: Number(
            bikePoint.additionalProperties.find(
              (property) => property.key === "NbEBikes",
            )?.value,
          ),
          lat: bikePoint.lat,
          lon: bikePoint.lon,
        }),
      );
    }
    return bikePointsDataStripped;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function checkBikePoint(bikePointId: string): Promise<Boolean> {
  let bikePoint = null;
  try {
    bikePoint = await prisma.bikePoint.findUnique({
      where: {
        id: bikePointId,
      },
    });
  } catch (error) {
    console.log(error);
    return false;
  }

  return bikePoint ? true : false;
}

async function createBikePoint(bikePoint: BikePoint): Promise<Boolean> {
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
    console.log(`Created bikePoint ${bikePoint.id}`);
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

async function populateBikePointsTable(): Promise<void> {
  const data = await formatBikePointData();
  if (data) {
    for (let bikePoint of data) {
      createBikePoint(bikePoint);
    }
  } else {
    console.log("Failed to populate bikePoint table");
  }
}

async function updateBikePointsTable(): Promise<void> {
  const data = await formatBikePointData();
  const isPopulated = (await prisma.bikePoint.count()) ? true : false;

  if (!isPopulated) {
    try {
      await populateBikePointsTable();
    } catch (error) {
      throw new Error("Error populating the docking station table");
    }
  } else if (!data) {
    console.log("Data undefined:");
    console.log(data);
  } else {
    for (let bikePoint of data) {
      try {
        const isExisting = await checkBikePoint(bikePoint.id);
        if (!isExisting) {
          console.log(`Bikepoint ${bikePoint.id} existing: ${isExisting}`);
        }

        if (!isExisting) {
          const res = await createBikePoint(bikePoint);
          console.log(`Created bikePoint: ${res}`);
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
      } catch (error) {
        console.log(error);
        console.log(`Error at bikePoint: ${bikePoint.id}`);
      }
    }
    console.log("Bikepoint table updated");
  }
}

export { updateBikePointsTable };
