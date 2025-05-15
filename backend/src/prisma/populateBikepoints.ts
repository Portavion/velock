import fetchTflData from "../utils/fetchTflData.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { BikePoint, BikePointTfL } from "../types";

//TODO: type for tfl response

let TFL_CACHE = await formatBikePointData();

async function formatBikePointData(): Promise<BikePoint[] | undefined> {
  try {
    const bikePointsData = await fetchTflData();
    const time = new Date().toLocaleString("en-GB");
    console.log(`${time}: Pulling TfL data`);
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
    const time = new Date().toLocaleString("en-GB");
    console.log(`${time}: Created bikePoint ${bikePoint.id}`);
  } catch (error) {
    const time = new Date().toLocaleString("en-GB");
    console.log(`${time}: Error creating bikePoint: ${error}`);
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
    const time = new Date().toLocaleString("en-GB");
    console.log(`${time} BikePoint Table populated`);
  } else {
    console.log("No data for populating BikePoint Table");
  }
}

async function updateBikePointsTable(): Promise<void> {
  const data = await formatBikePointData();
  const isPopulated = (await prisma.bikePoint.count()) ? true : false;

  if (!isPopulated) {
    try {
      await populateBikePointsTable();
    } catch (error) {
      const time = new Date().toLocaleString("en-GB");
      throw new Error(`${time}: Error populating the docking station table`);
    }
  } else if (!data) {
    const time = new Date().toLocaleString("en-GB");
    console.log(`${time} Data undefined:`);
    console.log(data);
  } else {
    if (!TFL_CACHE) {
      console.log("Error: no cach for tfl data");
    }
    if (!TFL_CACHE) {
      console.log("Error, no tfl cache");
      return;
    }
    // for (let tflBikePoint of TFL_CACHE)
    for (let bikePoint of data) {
      const matchingTfLBikePoint = TFL_CACHE?.filter(
        (tflBikePoint) => tflBikePoint.commonName == bikePoint.commonName,
      )[0];
      if (!matchingTfLBikePoint) {
        console.log("Potential new station, updating TfL cache");
        TFL_CACHE = await formatBikePointData();
      }
      if (
        matchingTfLBikePoint?.NbDocks != bikePoint.NbDocks ||
        matchingTfLBikePoint?.NbEBikes != bikePoint.NbEBikes ||
        matchingTfLBikePoint?.NbEmptyDocks != bikePoint.NbEmptyDocks ||
        matchingTfLBikePoint?.NbBikes != bikePoint.NbBikes ||
        matchingTfLBikePoint?.NbStandardBikes != bikePoint.NbStandardBikes ||
        matchingTfLBikePoint?.locked != bikePoint.locked
      ) {
        console.log("Updating: ", bikePoint.commonName);
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
          const time = new Date().toLocaleString("en-GB");
          console.log(`${time}Error at bikePoint: ${bikePoint.id}`);
          console.log(error);
          const res = await createBikePoint(bikePoint);
          console.log(`${time}: Created bikePoint: ${res}`);
        }
      }
    }
    const time = new Date().toLocaleString("en-GB");
    console.log(`${time} Bikepoint table updated`);
  }
}

export { updateBikePointsTable };
