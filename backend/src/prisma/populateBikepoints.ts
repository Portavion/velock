import fetchTflData from "../utils/fetchTflData";
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

async function populateBikePointsTable(): Promise<void> {
  const data = await formatBikePointData();
  if (data) {
    for (let bikePoint of data) {
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
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    console.log("something went wrong when populating BikePoint table");
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
  }
}

export { updateBikePointsTable };
