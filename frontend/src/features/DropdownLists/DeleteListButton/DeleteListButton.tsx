import styles from "./DeleteListButton.module.css";
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
          setActiveList(updatedBikePointList[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <button onClick={deleteList} type="button" className={styles.addButton}>
      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
        delete
      </span>
    </button>
  );
};
