import { BikePoint } from "@prisma/client";
import { formatBikePointData } from "../prisma/populateBikepoints.js";

let TFL_CACHE: BikePoint[] | undefined;

async function updateTfLCache() {
  TFL_CACHE = await formatBikePointData();
}

export { TFL_CACHE, updateTfLCache };
