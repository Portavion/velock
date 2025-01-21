import styles from "./BikePointDropdown.module.css";
import { AddListButton } from "../AddListButton/AddListButton";
import { DeleteListButton } from "../DeleteListButton/DeleteListButton";

function BikePointDropdown({
  bikePointLists,
  setBikePointLists,
  activeListName,
  setActiveList,
  token,
}: {
  bikePointLists: BikePointList[] | undefined;
  setBikePointLists: React.Dispatch<
    React.SetStateAction<BikePointList[] | undefined>
  >;
  activeListName: string | undefined;
  setActiveList: React.Dispatch<React.SetStateAction<string | undefined>>;
  token: string;
}) {
  if (bikePointLists) {
    return (
      <div className="dropdown">
        <select
          className={styles.dropdown}
          name="BikePointListsDropdown"
          id="BikePointListsDropdown"
          value={activeListName}
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
          activeListName={activeListName}
          bikePointLists={bikePointLists}
          setBikePointLists={setBikePointLists}
          token={token}
        />
      </div>
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
