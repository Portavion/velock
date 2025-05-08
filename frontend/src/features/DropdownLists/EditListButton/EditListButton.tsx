import React from "react";
import { PencilLine } from "lucide-react";

interface Props {
  isEditingModal: boolean;
  setIsEditingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditListButton: React.FC<Props> = ({
  isEditingModal,
  setIsEditingModal,
}) => {
  const handleEditingButtonPress = () => {
    setIsEditingModal(!isEditingModal);
  };

  return (
    <button
      onClick={handleEditingButtonPress}
      type="button"
      className="bg-teal-800 text-teal-950 text-center p-0 mx-1 rounded-md"
    >
      <PencilLine className="w-7 h-7 rounded-md" />
    </button>
  );
};
