import styles from "./AddListButton.module.css";
import React from "react";

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
          "http://localhost:3000/api/v1/bikepointslists",
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
          setActiveList(newListJSON.name);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <button onClick={addList} type="button" className={styles.addButton}>
      +
    </button>
  );
};
