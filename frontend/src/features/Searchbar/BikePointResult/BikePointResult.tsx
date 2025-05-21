import { useState } from "react";
import { useRetrieveJWT } from "../../../utils/retrieveJWT";
import styles from "./BikePointResult.module.css";
import {
  Bike,
  BatteryMedium,
  Battery,
  ParkingSquare,
  ParkingSquareOff,
} from "lucide-react";
import BikePointMap from "../../BikePointCards/BikePointMap/BikePointMap";

interface BikePointResultsProps {
  stationName: string;
  stationId: string;
  bikeLeft: number;
  spaceLeft: number;
  ebikeLeft: number;
  activeListId: number | null;
  coord: [number, number];
}

const BikePointResult = ({
  stationName,
  stationId,
  bikeLeft,
  spaceLeft,
  ebikeLeft,
  activeListId,
  coord,
}: BikePointResultsProps) => {
  const bikeAvailable = bikeLeft > 0 ? true : false;
  const spaceAvailable = spaceLeft > 0 ? true : false;
  const ebikeAvailable = ebikeLeft > 0 ? true : false;
  const token = useRetrieveJWT();
  const [added, setAdded] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);

  if (!activeListId) {
    return (
      <div className="bg-slate-50 w-60 p-1 color-black m-3 rounded-xl relative">
        <h3 className="text-black text-md">{stationName}</h3>
        <div className={styles.availableContainer}>
          <p className={bikeAvailable ? styles.available : styles.empty}>
            Bikes: {bikeLeft - ebikeLeft}
          </p>
          <p className={ebikeAvailable ? styles.available : styles.empty}>
            E-bikes: {ebikeLeft}
          </p>
          <p className={spaceAvailable ? styles.available : styles.empty}>
            Empty spaces: {spaceLeft}
          </p>
        </div>
      </div>
    );
  }

  const handleAddToList = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    try {
      const body =
        encodeURIComponent("listId") +
        "=" +
        encodeURIComponent(activeListId) +
        "&" +
        encodeURIComponent("bikePoint") +
        "=" +
        encodeURIComponent(stationId);

      await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/bikepointslists/add/`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: body,
        },
      );
      setAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => setIsMapVisible(!isMapVisible)}
      className="bg-teal-900 p-4 mb-4 rounded-md shadow-md list-none w-80"
    >
      <h3 className="font-medium text-md p-0">{stationName}</h3>

      <div className="grid grid-cols-3 gap-2 text-sm w-full">
        <div className="flex items-center">
          {bikeLeft && <Bike size={16} className="mr-1 text-green-500" />}
          {!bikeLeft && <Bike size={16} className="mr-1 text-red-500" />}
          <span>
            {bikeLeft} {bikeLeft > 1 ? "bikes" : "bike"}
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
            {ebikeLeft} {ebikeLeft > 1 ? "e-bikes" : "e-bike"}
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
            {spaceLeft} {spaceLeft > 1 ? "spaces" : "space"}
          </span>
        </div>
      </div>
      {added && (
        <button
          id={stationId}
          className="bg-teal-800 text-stone-200 mt-4 w-12 text-center round-md inset-shadow-sm/80"
        >
          Added
        </button>
      )}
      {!added && (
        <button
          id={stationId}
          className="z-10 bg-teal-700 text-slate-100 mt-4 w-12 text-center round-md shadow-sm"
          onClick={handleAddToList}
        >
          Add
        </button>
      )}
      <BikePointMap x={coord[0]} y={coord[1]} isMapVisible={isMapVisible} />
    </div>
  );
};

export { BikePointResult };
