import fetchTflData from "../utils/fetchTflData";
import prisma from "./prisma";

//TODO: type for tfl response
async function formatBikePointData(): Promise<any> {
  try {
    const bikePointsData: any = await fetchTflData();

    return bikePointsData.map((bikePoint: any) => ({
      id: bikePoint.id,
      commonName: bikePoint.commonName,
      locked: bikePoint.additionalProperties[2].value,
      bikes: bikePoint.additionalProperties[6].value,
      emptyDocks: bikePoint.additionalProperties[7].value,
      docks: bikePoint.additionalProperties[8].value,
      standardBike: bikePoint.additionalProperties[9].value,
      ebikes: bikePoint.additionalProperties[10].value,
      lat: bikePoint.lat,
      lon: bikePoint.lon,
    }));
  } catch (error) {
    console.log(error);
  }
}

async function populateBikePointsTable(): Promise<void> {
  const data = await formatBikePointData();

  try {
    await prisma.bikePoint.createMany({ data: data });
  } catch (error) {
    console.log(error);
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
  } else {
    for (let bikePoint of data) {
      try {
        await prisma.bikePoint.update({
          where: { id: bikePoint.id },
          data: {
            id: bikePoint.id,
            commonName: bikePoint.commonName,
            locked: bikePoint.locked,
            bikes: bikePoint.bikes,
            emptyDocks: bikePoint.emptyDocks,
            docks: bikePoint.docks,
            standardBike: bikePoint.standardBike,
            ebikes: bikePoint.ebikes,
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
