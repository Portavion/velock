import { formatBikePointData } from "../prisma/populateBikepoints.js";
let TFL_CACHE;
async function updateTfLCache() {
    TFL_CACHE = await formatBikePointData();
}
export { TFL_CACHE, updateTfLCache };
