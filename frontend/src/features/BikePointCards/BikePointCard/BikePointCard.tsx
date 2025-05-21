import {
  Bike,
  Battery,
  BatteryMedium,
  ParkingSquare,
  ParkingSquareOff,
  X,
} from "lucide-react";

import { removeFromList } from "../../../utils/removeFromList";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import BikePointMap from "../BikePointMap/BikePointMap";

interface BikePointCardProps {
  stationId: string;
  list: number;
  bikePoints: BikePoint[];
  setBikePoints: React.Dispatch<React.SetStateAction<BikePoint[] | undefined>>;
  isEditingModal: boolean;
}

const BikePointCard = ({
  stationId,
  list,
  bikePoints,
  setBikePoints,
  isEditingModal,
}: BikePointCardProps) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const stationIndex = bikePoints.findIndex(
    (bikePoint) => bikePoint.id === stationId,
  );
  const stationName = bikePoints[stationIndex].commonName;
  const bikePoint = bikePoints[stationIndex];
  const bikeAvailable = bikePoint.NbStandardBikes > 0 ? true : false;
  const spaceAvailable = bikePoint.NbEmptyDocks > 0 ? true : false;
  const ebikeAvailable = bikePoint.NbEbikes > 0 ? true : false;
  const token = useContext(AuthContext);

  const handleDelete = async () => {
    removeFromList(token, list, stationId);
    setBikePoints(bikePoints.filter((bikePoint) => bikePoint.id !== stationId));
  };

  const toggleMap = () => {
    setIsMapVisible(!isMapVisible);
  };

  return (
    <li
      onClick={toggleMap}
      className="bg-teal-900 p-4 rounded-md shadow-md list-none w-80"
    >
      <h3 className="font-medium text-md p-0">{stationName}</h3>
      <div className="relative mb-2">
        {isEditingModal && (
          <button
            id={stationId}
            onClick={handleDelete}
            className="absolute -top-9 -right-3 text-teal-950 hover:text-red-900 rounded text-md list-none hover"
          >
            <X className="w-5 h-5 rounded-md" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm w-full">
        <div className="flex items-center">
          {bikeAvailable && <Bike size={16} className="mr-1 text-green-500" />}
          {!bikeAvailable && <Bike size={16} className="mr-1 text-red-500" />}
          <span>
            {bikePoint.NbStandardBikes}{" "}
            {bikePoint.NbStandardBikes > 1 ? "bikes" : "bike"}
          </span>
        </div>
        <div className="flex items-center">
          {ebikeAvailable && (
            <BatteryMedium size={16} className="mr-1 text-green-500" />
          )}
          {!ebikeAvailable && (
            <Battery size={16} className="mr-1 text-red-500" />
          )}
          <span>
            {bikePoint.NbEbikes} {bikePoint.NbEbikes > 1 ? "e-bikes" : "e-bike"}
          </span>
        </div>
        <div className="flex items-center">
          {spaceAvailable && (
            <ParkingSquare size={16} className="mr-1 text-green-500" />
          )}
          {!spaceAvailable && (
            <ParkingSquareOff size={16} className="mr-1 text-red-500" />
          )}
          <span>
            {bikePoint.NbEmptyDocks}{" "}
            {bikePoint.NbEmptyDocks > 1 ? "spaces" : "space"}
          </span>
        </div>
      </div>
      <BikePointMap
        x={bikePoint.lat}
        y={bikePoint.lon}
        isMapVisible={isMapVisible}
      />
    </li>
  );
};

export { BikePointCard };
