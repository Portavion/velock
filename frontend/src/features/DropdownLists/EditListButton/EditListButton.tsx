import React, { useContext } from "react";
import { PencilLine, Save } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext";
import { updateList } from "../../../utils/updateList";

interface Props {
  activeList: BikePointList | undefined;
  isEditingModal: boolean;
  setIsEditingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditListButton: React.FC<Props> = ({
  activeList,
  isEditingModal,
  setIsEditingModal,
}) => {
  const token = useContext(AuthContext);

  const handleEditingButtonPress = () => {
    setIsEditingModal(!isEditingModal);
    if (isEditingModal) {
      if (activeList?.id) {
        const ids = activeList.bikePointsIds;
        updateList(token, activeList.id, ids);
        console.log(`Saving new list of ids: ${ids}`);
      } else {
        console.log("Error saving order, missing active list id");
      }
    }
  };

  return (
    <button
      onClick={handleEditingButtonPress}
      type="button"
      className="bg-teal-800 text-teal-950 text-center p-0 mx-1 rounded-md"
    >
      {!isEditingModal && <PencilLine className="w-7 h-7 rounded-md" />}
      {isEditingModal && <Save className="w-7 h-7 rounded-md" />}
    </button>
  );
};
