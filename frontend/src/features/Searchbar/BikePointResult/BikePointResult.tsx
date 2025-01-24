import styles from "./BikePointResult.module.css";

const BikePointResult = ({
  stationName,
  bikeLeft,
  spaceLeft,
  ebikeLeft,
}: {
  stationName: string;
  bikeLeft: number;
  spaceLeft: number;
  ebikeLeft: number;
}) => {
  const bikeAvailable = bikeLeft > 0 ? true : false;
  const spaceAvailable = spaceLeft > 0 ? true : false;
  const ebikeAvailable = ebikeLeft > 0 ? true : false;

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
      </div>
      <p className={spaceAvailable ? styles.available : styles.empty}>
        Empty spaces: {spaceLeft}
      </p>
    </div>
  );
};

export { BikePointResult };
