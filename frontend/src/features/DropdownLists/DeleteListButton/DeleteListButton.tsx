import React, { useContext } from "react";
import { Trash2 } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext";

export const DeleteListButton: React.FC<DeleteListButton> = ({
  activeList,
  bikePointLists,
  setBikePointLists,
  setActiveList,
}) => {
  const token = useContext(AuthContext);
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
      className="bg-teal-800 text-teal-950 text-center p-0 mx-1 rounded-md"
    >
      <Trash2 className="w-7 h-7 rounded-md" />
    </button>
  );
};
