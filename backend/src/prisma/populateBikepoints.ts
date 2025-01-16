import fetchTflData from "../utils/fetchTflData";
import prisma from "./prisma";

//TODO: type for tfl response
async function formatBikePointData(): Promise<any> {
  try {
    const bikePointsData: any = await fetchTflData();

    return bikePointsData.map((bikePoint: any) => ({
      id: bikePoint.id,
      commonName: bikePoint.commonName,
      locked: bikePoint.additionalProperties[2].value === "true" ? true : false,
      bikes: Number(bikePoint.additionalProperties[6].value),
      emptyDocks: Number(bikePoint.additionalProperties[7].value),
      docks: Number(bikePoint.additionalProperties[8].value),
      standardBike: Number(bikePoint.additionalProperties[9].value),
      ebikes: Number(bikePoint.additionalProperties[10].value),
      lat: Number(bikePoint.lat),
      lon: Number(bikePoint.lon),
    }));
  } catch (error) {
    throw new Error("Error getting bike point data");
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
  const isPopulated = (await prisma.bikePoint.count()) > 0 ? true : false;

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
            bikes: Number(bikePoint.bikes),
            // emptyDocks: Number(bikePoint.emptyDocks),
            emptyDocks:
              bikePoint.docks - (bikePoint.standardBike + bikePoint.ebikes),
            docks: Number(bikePoint.docks),
            standardBike: Number(bikePoint.standardBike),
            ebikes: Number(bikePoint.ebikes),
            lat: Number(bikePoint.lat),
            lon: Number(bikePoint.lon),
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
