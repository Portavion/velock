import fetch, { Response as FetchResponse } from "node-fetch";

async function fetchTflData(): Promise<unknown> {
  try {
    const bikePointsFetchURL = "https://api.tfl.gov.uk/BikePoint";

    const bikeStationResponse: FetchResponse = await fetch(bikePointsFetchURL);

    const bikeStationJson = bikeStationResponse.json();
    return bikeStationJson;
  } catch (error: unknown) {
    throw new Error(`Issue fetching bike station information: ${error}`);
  }
}

export default fetchTflData;
