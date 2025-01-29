import styles from "./BikePointCard.module.css";
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
    <div className={styles.dockingStationContainer}>
      <h3>{stationName}</h3>
      <button
        id={stationId}
        className={styles.delButton}
        onClick={handleDelete}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "12px" }}
        >
          close
        </span>
      </button>
      <div className={styles.availableContainer}>
        <p className={bikeAvailable ? styles.available : styles.empty}>
          Bikes: {bikeLeft - ebikeLeft}
        </p>
        <p className={ebikeAvailable ? styles.available : styles.empty}>
          E-bikes: {ebikeLeft}
        </p>
      </div>
      <p className={spaceAvailable ? styles.available : styles.empty}>
        Empty spaces: {spaceLeft}
      </p>
    </div>
  );
};

export { BikePointCard };
