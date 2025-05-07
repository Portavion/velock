import React, { useContext } from "react";
import { PencilLine } from "lucide-react";
import { AuthContext } from "../../../contexts/AuthContext";

export const EditListButton: React.FC<EditListButton> = ({
  isEditingModal,
  setIsEditingModal,
}) => {
  async function addList();

  const handleEditingButtonPress = () => {
    setIsEditingModal(!isEditingModal);
  };

  return (
    <button
      onClick={handleEditingButtonPress}
      type="button"
      className="bg-teal-800 text-teal-950 text-center p-0 mx-1 rounded-md"
    >
      <PencilLine className="w-5 h-5 rounded-md" />
    </button>
  );
};
