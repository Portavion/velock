import styles from "./DeleteListButton.module.css";
import React from "react";

export const DeleteListButton: React.FC<DeleteListButton> = ({
  activeListName,
  bikePointLists,
  setBikePointLists,
  token,
}) => {
  async function deleteList(): Promise<void> {
    const listToDeleteName = activeListName;
    const listToDeleteId = bikePointLists?.filter(
      (list) => list.name === listToDeleteName,
    );
    if (listToDeleteId) {
      try {
        console.log(listToDeleteId);
        const body =
          encodeURIComponent("listId") +
          "=" +
          encodeURIComponent(listToDeleteId[0].id);
        const deleteListResponse = await fetch(
          "http://localhost:3000/api/v1/bikepointslists",
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
        console.log("deleted list response:" + isListDeleted);
        if (isListDeleted) {
          const updatedBikePointList = bikePointLists?.filter(
            (list) => list.name !== listToDeleteName,
          ) as BikePointList[];

          setBikePointLists([...updatedBikePointList]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <button onClick={deleteList} type="button" className={styles.addButton}>
      Del
    </button>
  );
};
