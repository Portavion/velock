import fetch, { Response as FetchResponse } from "node-fetch";

import { BikePointTfL } from "../types";

async function fetchTflData(): Promise<BikePointTfL[] | undefined> {
  try {
    const bikePointsFetchURL = "https://api.tfl.gov.uk/BikePoint";
    const bikeStationResponse: FetchResponse = await fetch(bikePointsFetchURL);

    const bikeStationJson: Promise<BikePointTfL[]> =
      (await bikeStationResponse.json()) as Promise<BikePointTfL[]>;

    return bikeStationJson;
  } catch (error: unknown) {
    console.log(error);
    return;
  }
}

export default fetchTflData;
