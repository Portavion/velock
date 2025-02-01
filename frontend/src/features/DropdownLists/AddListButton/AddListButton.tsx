import React from "react";
import { SquarePlus } from "lucide-react";

export const AddListButton: React.FC<AddListButton> = ({
  bikePointLists,
  setBikePointLists,
  setActiveList,
  token,
}) => {
  async function addList() {
    const newListName = prompt("Please enter the name of your list:");
    if (newListName) {
      try {
        const body =
          encodeURIComponent("listName") +
          "=" +
          encodeURIComponent(newListName);
        const newListResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/bikepointslists`,
          {
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
            body: body,
          },
        );

        const newListJSON = (await newListResponse.json()) as BikePointList;
        if (bikePointLists) {
          setBikePointLists([
            ...bikePointLists,
            {
              id: newListJSON.id,
              name: newListJSON.name,
              bikePointsIds: newListJSON.bikePointsIds,
              userId: newListJSON.userId,
            },
          ]);
          setActiveList(newListJSON);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <button
      onClick={addList}
      type="button"
      className="bg-teal-800 text-teal-950 text-center p-0 mx-1 rounded-md"
    >
      <SquarePlus className="w-5 h-5 rounded-md" />
    </button>
  );
};
