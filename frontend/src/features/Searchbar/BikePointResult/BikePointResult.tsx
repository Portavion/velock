import { useState } from "react";
import { useRetrieveJWT } from "../../../utils/retrieveJWT";
import styles from "./BikePointResult.module.css";

const BikePointResult = ({
  stationName,
  stationId,
  bikeLeft,
  spaceLeft,
  ebikeLeft,
  activeListId,
}: {
  stationName: string;
  stationId: string;
  bikeLeft: number;
  spaceLeft: number;
  ebikeLeft: number;
  activeListId: number | null;
}) => {
  const bikeAvailable = bikeLeft > 0 ? true : false;
  const spaceAvailable = spaceLeft > 0 ? true : false;
  const ebikeAvailable = ebikeLeft > 0 ? true : false;
  const token = useRetrieveJWT();
  const [added, setAdded] = useState(false);

  if (!activeListId) {
    return (
      <div className={styles.dockingStationContainer}>
        <h3>{stationName}</h3>
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
      <div className={styles.dockingStationContainer}>
        <h3>{stationName}</h3>
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

      await fetch("http://localhost:3000/api/v1/bikepointslists", {
        method: "PUT",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });
      setAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.dockingStationContainer}>
      <h3>{stationName}</h3>
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
      <button
        id={stationId}
        className={styles.addButton}
        onClick={handleAddToList}
      >
        Add
      </button>
    </div>
  );
};

export { BikePointResult };
