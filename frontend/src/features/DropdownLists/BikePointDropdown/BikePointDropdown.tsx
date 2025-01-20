import { useEffect, useState } from "react";
import { useRetrieveJWT } from "../../../utils/retrieveJWT";
import styles from "./BikePointDropdown.module.css";
import { AddListButton } from "../AddListButton/AddListButton";
import { DeleteListButton } from "../DeleteListButton/DeleteListButton";
import { loadBikePointLists } from "../../../utils/loadBikePointLists";

function BikePointDropdown() {
  const [bikePointLists, setBikePointLists] = useState<
    BikePointList[] | undefined
  >();
  const [activeList, setActiveList] = useState<string>();
  const token = useRetrieveJWT();

  useEffect(() => {
    const fetchList = async () => {
      if (token) {
        const data = await loadBikePointLists(token);
        setBikePointLists(data);
        if (data[0]) setActiveList(data[0].name);
      }
    };
    fetchList();
  }, [token]);

  if (bikePointLists) {
    return (
      <>
        <select
          className={styles.dropdown}
          name="BikePointListsDropdown"
          id="BikePointListsDropdown"
          value={activeList}
          onChange={(e) => setActiveList(e.target.value)}
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
        />
      </>
    );
  } else {
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
}

export { BikePointDropdown };
