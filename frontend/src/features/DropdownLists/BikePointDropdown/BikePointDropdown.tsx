import { useContext, useEffect, useState } from "react";
import styles from "./BikePointDropdown.module.css";
import { AddListButton } from "../AddListButton/AddListButton";
import { EditListButton } from "../EditListButton/EditListButton";
import { DeleteListButton } from "../DeleteListButton/DeleteListButton";
import { AuthContext } from "../../../contexts/AuthContext";

interface BikePointDropdownProps {
  bikePointLists: BikePointList[] | undefined;
  setBikePointLists: React.Dispatch<
    React.SetStateAction<BikePointList[] | undefined>
  >;
  activeList: BikePointList | undefined;
  setActiveList: React.Dispatch<
    React.SetStateAction<BikePointList | undefined>
  >;
  isEditingModal: boolean;
  setIsEditingModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function BikePointDropdown({
  bikePointLists,
  setBikePointLists,
  activeList,
  setActiveList,
  isEditingModal,
  setIsEditingModal,
}: BikePointDropdownProps) {
  const [activeListName, setActiveListName] = useState("");
  const token = useContext(AuthContext);

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveListName(e.target.value);
    const updatedActiveList = bikePointLists?.filter(
      (list) => list.name === e.target.value,
    ) as BikePointList[];
    setActiveList(updatedActiveList[0]);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center h-8 mb-8 w-full ">
        <DeleteListButton
          activeList={activeList}
          setActiveList={setActiveList}
          bikePointLists={bikePointLists}
          setBikePointLists={setBikePointLists}
          token={token}
        />
        <select
          name="BikePointListsDropdown"
          id="BikePointListsDropdown"
          value={activeListName}
          onChange={handleChange}
          className="bg-teal-800 border-1 h-9 text-center rounded-md m-1 w-52"
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

        <EditListButton
          isEditingModal={isEditingModal}
          setIsEditingModal={setIsEditingModal}
        />
      </div>
    </div>
  );
}

export { BikePointDropdown };
