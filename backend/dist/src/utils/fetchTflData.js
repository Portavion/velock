import fetch from "node-fetch";
async function fetchTflData() {
    try {
        const bikePointsFetchURL = "https://api.tfl.gov.uk/BikePoint";
        const bikeStationResponse = await fetch(bikePointsFetchURL);
        const bikeStationJson = (await bikeStationResponse.json());
        return bikeStationJson;
    }
    catch (error) {
        console.log(error);
        return;
    }
}
export default fetchTflData;
