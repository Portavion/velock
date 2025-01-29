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
    await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/bikepointslists/name`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      },
    );
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export { removeFromList };
