async function getSearchResults(
  token: string,
  address: string,
): Promise<BikePoint[]> {
  let bikePoints: BikePoint[] = [];
  const formatedAddress = address.replaceAll(" ", "+");
  try {
    const bikePointResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/bikepoints/searchAddress/?address=${formatedAddress}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const bikePointData: BikePoint[] = await bikePointResponse.json();
    bikePoints = bikePoints.concat(bikePointData);
    return bikePoints;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { getSearchResults };
