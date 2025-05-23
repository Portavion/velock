async function loadBikePoints(token: string, activeList: BikePointList) {
  const bikePoints: BikePoint[] = [];
  try {
    for (const bikePointId of activeList.bikePointsIds) {
      const bikePointResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/bikepoints/id/?id=${bikePointId}`,
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
