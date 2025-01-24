import { useEffect, useState } from "react";
import styles from "./BikePointDropdown.module.css";
import { AddListButton } from "../AddListButton/AddListButton";
import { DeleteListButton } from "../DeleteListButton/DeleteListButton";

function BikePointDropdown({
  bikePointLists,
  setBikePointLists,
  activeList,
  setActiveList,
  token,
}: {
  bikePointLists: BikePointList[] | undefined;
  setBikePointLists: React.Dispatch<
    React.SetStateAction<BikePointList[] | undefined>
  >;
  activeList: BikePointList | undefined;
  setActiveList: React.Dispatch<
    React.SetStateAction<BikePointList | undefined>
  >;
  token: string;
}) {
  const [activeListName, setActiveListName] = useState("");

  useEffect(() => {
    if (!activeList) {
      setActiveListName("");
    } else {
      setActiveListName(activeList.name);
    }
  }, [activeList]);

  if (!bikePointLists) {
    return (
      <>
        <select
          className={styles.dropdown}
          name="BikePointListsDropdown"
          id="BikePointListsDropdown"
        ></select>
      </>
    );
  }

  return (
    <div className="dropdown">
      <select
        className={styles.dropdown}
        name="BikePointListsDropdown"
        id="BikePointListsDropdown"
        value={activeListName}
        onChange={(e) => setActiveListName(e.target.value)}
      >
        {bikePointLists.map((list) => (
          <option key={list.id} value={list.name}>
            {list.name}
          </option>
        ))}
      </select>

      <AddListButton
        bikePointLists={bikePointLists}
        setBikePointLists={setBikePointLists}
        token={token}
        setActiveList={setActiveList}
      />

      <DeleteListButton
        activeList={activeList}
        bikePointLists={bikePointLists}
        setBikePointLists={setBikePointLists}
        token={token}
        // setActiveList={setActiveList}
      />
    </div>
  );
}

export { BikePointDropdown };
