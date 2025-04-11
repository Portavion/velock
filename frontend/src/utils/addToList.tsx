async function addToList(
  token: string,
  listId: number,
  bikePointId: string,
): Promise<string[]> {
  const formBody =
    encodeURIComponent("listId") +
    "=" +
    encodeURIComponent(listId) +
    "&" +
    encodeURIComponent("bikePoint") +
    "=" +
    encodeURIComponent(bikePointId);

  try {
    const bikePointResponse = await fetch(
      `${process.env.VITE_BASE_URL}/api/v1/bikepointslists/`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: formBody,
      },
    );
    const updatedList: BikePointList = await bikePointResponse.json();
    const bikePoints = updatedList.bikePointsIds;
    return bikePoints;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { addToList };
