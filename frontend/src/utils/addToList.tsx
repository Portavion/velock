async function addToList(
  token: string,
  listId: number,
  bikePointId: string,
): Promise<BikePoint[]> {
  const body = { token: token, listId: listId, bikePointToAdd: bikePointId };

  const formBody = Object.keys(body)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
    .join("&");

  try {
    await fetch(`http://localhost:3000/api/v1/bikepointslists/`, {
      method: "PUT",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: formBody,
    });
    const bikePointData: BikePoint[] = await bikePointResponse.json();
    bikePoints = bikePoints.concat(bikePointData);
    return bikePoints;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export { addToList };
