import React from "react";

export const DeleteListButton: React.FC<DeleteListButton> = ({
  activeList,
  bikePointLists,
  setBikePointLists,
  setActiveList,
  token,
}) => {
  async function deleteList(): Promise<void> {
    const listToDeleteName = activeList?.name;
    if (activeList) {
      try {
        const body =
          encodeURIComponent("listId") +
          "=" +
          encodeURIComponent(activeList.id);
        const deleteListResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/bikepointslists`,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
            body: body,
          },
        );
        const isListDeleted =
          (await deleteListResponse.json()) as BikePointList;
        if (isListDeleted) {
          const updatedBikePointList = bikePointLists?.filter(
            (list) => list.name !== listToDeleteName,
          ) as BikePointList[];

          setBikePointLists([...updatedBikePointList]);
          setActiveList(updatedBikePointList[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <button
      onClick={deleteList}
      type="button"
      className="bg-slate-100 text-black text-center p-0 mx-1 rounded-md"
    >
      <span
        className="material-symbols-outlined  text-center p-0  table m-1"
        style={{ fontSize: "20px", display: "flex" }}
      >
        delete
      </span>
    </button>
  );
};
