async function updateList(
  token: string,
  listId: number,
  bikePointIds: string[],
): Promise<string[]> {
  let idString = bikePointIds[0];

  for (let i = 1; i < bikePointIds.length; i++) {
    idString = idString + ";" + bikePointIds[i];
  }

  const formBody =
    encodeURIComponent("listId") +
    "=" +
    encodeURIComponent(listId) +
    "&" +
    encodeURIComponent("bikePoints") +
    "=" +
    encodeURIComponent(idString);

  try {
    const bikePointResponse = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/bikepointslists/`,
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

export { updateList };
