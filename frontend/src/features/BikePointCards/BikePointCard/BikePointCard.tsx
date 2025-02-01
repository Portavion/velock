import {
  Bike,
  Battery,
  BatteryMedium,
  ParkingSquare,
  ParkingSquareOff,
  X,
} from "lucide-react";

import { removeFromList } from "../../../utils/removeFromList";

const BikePointCard = ({
  stationName,
  bikeLeft,
  spaceLeft,
  ebikeLeft,
  stationId,
  list,
  token,
}: {
  stationName: string;
  bikeLeft: number;
  spaceLeft: number;
  ebikeLeft: number;
  stationId: string;
  list: number;
  token: string;
}) => {
  const bikeAvailable = bikeLeft > 0 ? true : false;
  const spaceAvailable = spaceLeft > 0 ? true : false;
  const ebikeAvailable = ebikeLeft > 0 ? true : false;

  const handleDelete = async () => {
    removeFromList(token, list, stationId);
  };

  return (
    <li className="bg-teal-900 p-4 rounded-md shadow-md list-none w-80">
      <h3 className="font-medium text-md p-0">{stationName}</h3>
      <div className="relative mb-2">
        <button
          id={stationId}
          onClick={() => handleDelete}
          className="absolute -top-9 -right-3 text-teal-950 hover:text-red-900 rounded text-md list-none hover"
        >
          <X className="w-5 h-5 rounded-md" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm w-full">
        <div className="flex items-center">
          {bikeAvailable && <Bike size={16} className="mr-1 text-green-500" />}
          {!bikeAvailable && <Bike size={16} className="mr-1 text-red-500" />}
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
    </li>
    // <div className="bg-slate-50 w-60 p-1 color-black m-3 rounded-xl relative">
    //   <h3 className="text-black text-md">{stationName}</h3>
    //   <button
    //     id={stationId}
    //     className={styles.delButton}
    //     onClick={handleDelete}
    //   >
    //     <span
    //       className="material-symbols-outlined"
    //       style={{ fontSize: "12px" }}
    //     >
    //       close
    //     </span>
    //   </button>
    //   <div className={styles.availableContainer}>
    //     <p className={bikeAvailable ? styles.available : styles.empty}>
    //       Bikes: {bikeLeft - ebikeLeft}
    //     </p>
    //     <p className={ebikeAvailable ? styles.available : styles.empty}>
    //       E-bikes: {ebikeLeft}
    //     </p>
    //   </div>
    //   <p className={spaceAvailable ? styles.available : styles.empty}>
    //     Empty spaces: {spaceLeft}
    //   </p>
    // </div>
  );
};

export { BikePointCard };
