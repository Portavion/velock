async function loadBikePointLists(token: string) {
  try {
    const bikePointListsResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/bikepointslists`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const bikePointLists: BikePointList[] = await bikePointListsResponse.json();
    return bikePointLists;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { loadBikePointLists };
