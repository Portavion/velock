async function loadBikePoints(token: string, activeList: BikePointList) {
  // const bikePoints: BikePoint[] = [];
  try {
    const urlsToFetch: string[] = [];
    for (const bikePointId of activeList.bikePointsIds) {
      urlsToFetch.push(
        `${import.meta.env.VITE_BASE_URL}/api/v1/bikepoints/id/?id=${bikePointId}`,
      );
      //   const bikePointResponse = await fetch(
      //     `${import.meta.env.VITE_BASE_URL}/api/v1/bikepoints/id/?id=${bikePointId}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "content-type": "application/x-www-form-urlencoded",
      //       Authorization: `Bearer ${token}`,
      //     },
      //     },
      //   );
    }

    const fetchURLs = async (
      urls: string[],
    ): Promise<BikePoint[] | undefined> => {
      try {
        const promises = urls.map((url) =>
          fetch(url, {
            method: "GET",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }),
        );
        const responses = await Promise.all(promises);
        const data = await Promise.all(
          responses.map((response) => response.json()),
        );
        return data;
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    const bikePoints = fetchURLs(urlsToFetch);

    return bikePoints;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { loadBikePoints };
