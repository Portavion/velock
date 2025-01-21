async function loadBikePoints(token: string, activeList: BikePointList[]) {
  const bikePoints: BikePoint[] = [];
  try {
    for (const bikePointId of activeList[0].bikePointsIds) {
      const bikePointResponse = await fetch(
        `http://localhost:3000/api/v1/bikepoints/id/?id=${bikePointId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const bikePoint: BikePoint = await bikePointResponse.json();
      bikePoints.push(bikePoint);
    }
    return bikePoints;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { loadBikePoints };
