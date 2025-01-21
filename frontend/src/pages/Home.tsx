import { useEffect, useState } from "react";
import { loadBikePointLists } from "../utils/loadBikePointLists";
import { loadBikePoints } from "../utils/loadBikePoints";
import { useRetrieveJWT } from "../utils/retrieveJWT";

import { BikePointCard } from "../features/BikePointCards/BikePointCard/BikePointCard";
import { BikePointDropdown } from "../features/DropdownLists";
import { Searchbar } from "../features/Searchbar/";

function LoginPage() {
  const [bikePointLists, setBikePointLists] = useState<
    BikePointList[] | undefined
  >();
  const [activeListName, setActiveList] = useState<string>();
  const [bikePoints, setBikePoints] = useState<BikePoint[]>();
  const token = useRetrieveJWT();

  useEffect(() => {
    const fetchList = async () => {
      if (token) {
        const data = await loadBikePointLists(token);
        setBikePointLists(data);
        if (data[0]) setActiveList(data[0].name);
      }
    };
    fetchList();
  }, [token]);

  useEffect(() => {
    const fetchBikePoints = async () => {
      if (token && activeListName && bikePointLists) {
        const activeBikePointList = bikePointLists.filter(
          (list) => list.name === activeListName,
        );
        const data = await loadBikePoints(token, activeBikePointList);
        setBikePoints(data);
      }
    };
    fetchBikePoints();
  }, [token, activeListName]);

  const bikePointCards = bikePoints?.map((bikePoint) => {
    return (
      <BikePointCard
        stationName={bikePoint.commonName}
        bikeLeft={bikePoint.NbBikes}
        ebikeLeft={bikePoint.NbEbikes}
        spaceLeft={bikePoint.NbEmptyDocks}
      ></BikePointCard>
    );
  });

  return (
    <>
      <Searchbar />
      <BikePointDropdown
        bikePointLists={bikePointLists}
        setBikePointLists={setBikePointLists}
        activeListName={activeListName}
        setActiveList={setActiveList}
        token={token}
      />
      {bikePointCards}
    </>
  );
}

export default LoginPage;
