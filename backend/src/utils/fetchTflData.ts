import fetch, { Response as FetchResponse } from "node-fetch";

async function fetchTflData(): Promise<JSON | unknown> {
  try {
    const bikePointsFetchURL = "https://api.tfl.gov.uk/BikePoint";

    const bikeStationResponse: FetchResponse = await fetch(bikePointsFetchURL);

    const bikeStationJson = bikeStationResponse.json();
    return bikeStationJson;
  } catch (error: unknown) {
    return error;
  }
}

export default fetchTflData;