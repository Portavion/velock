import { useState } from "react";
import { useRetrieveJWT } from "../../../utils/retrieveJWT";
import styles from "./BikePointResult.module.css";

interface BikePointResultsProps {
  stationName: string;
  stationId: string;
  bikeLeft: number;
  spaceLeft: number;
  ebikeLeft: number;
  activeListId: number | null;
}

const BikePointResult = ({
  stationName,
  stationId,
  bikeLeft,
  spaceLeft,
  ebikeLeft,
  activeListId,
}: BikePointResultsProps) => {
  const bikeAvailable = bikeLeft > 0 ? true : false;
  const spaceAvailable = spaceLeft > 0 ? true : false;
  const ebikeAvailable = ebikeLeft > 0 ? true : false;
  const token = useRetrieveJWT();
  const [added, setAdded] = useState(false);

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

  if (added) {
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
        <button id={stationId} className={styles.addButton}>
          Added
        </button>
      </div>
    );
  }
  const handleAddToList = async () => {
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
    <div className="bg-slate-50 w-70  h-30 p-0 color-black m-3 rounded-xl relative flex flex-col items-center justify-around">
      <h3 className="text-black text-md ">{stationName}</h3>
      <div className="flex flex-row justify-between flex-wrap">
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
      <button
        id={stationId}
        className="bg-slate-500 text-slate-100 w-10 round-md"
        onClick={handleAddToList}
      >
        Add
      </button>
    </div>
  );
};

export { BikePointResult };
