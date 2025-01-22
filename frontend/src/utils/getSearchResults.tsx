async function getSearchResults(
  token: string,
  address: string,
): Promise<BikePoint[]> {
  let bikePoints: BikePoint[] = [];
  const formatedAddress = address.replaceAll(" ", "+");
  try {
    const bikePointResponse = await fetch(
      `http://localhost:3000/api/v1/bikepoints/searchAddress/?address=${formatedAddress}`,
      // "http://localhost:3000/api/v1/bikepoints/searchAddress/?address=235+old+ford+road",
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
