async function addToList(
  token: string,
  listId: number,
  bikePointId: string,
): Promise<string[]> {
  // const body = { token: token, listId: listId, bikePointToAdd: bikePointId };

  const formBody =
    encodeURIComponent("listId") +
    "=" +
    encodeURIComponent(listId) +
    "&" +
    encodeURIComponent("bikePoint") +
    "=" +
    encodeURIComponent(bikePointId);
  // const formBody = Object.keys(body)
  //   .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
  //   .join("&");

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
