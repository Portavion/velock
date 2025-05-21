import { BikePoint } from "@prisma/client";
import { formatBikePointData } from "../prisma/populateBikepoints.js";

let TFL_CACHE: Map<string, BikePoint> = new Map();

async function updateTfLCache() {
  const tfl_data = await formatBikePointData();
  if (!tfl_data) {
    return;
  }
  for (let bikePoint of tfl_data) {
    TFL_CACHE.set(bikePoint.id, bikePoint);
  }
}

export { TFL_CACHE, updateTfLCache };
