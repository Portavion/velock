async function removeFromList(
  token: string,
  listId: number,
  bikePointId: string,
): Promise<void> {
  const body =
    encodeURIComponent("listId") +
    "=" +
    encodeURIComponent(listId) +
    "&" +
    encodeURIComponent("bikePoint") +
    "=" +
    encodeURIComponent(bikePointId);

  try {
    console.log(body);
    console.log(bikePointId);
    await fetch(`http://localhost:3000/api/v1/bikepointslists/name`, {
      method: "DELETE",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export { removeFromList };
