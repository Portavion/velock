import { useEffect, useState } from "react";
import { loadBikePointLists } from "../utils/loadBikePointLists";
import { loadBikePoints } from "../utils/loadBikePoints";
import { useRetrieveJWT } from "../utils/retrieveJWT";
import { v4 as uuidv4 } from "uuid";

import { BikePointCard } from "../features/BikePointCards/BikePointCard/BikePointCard";
import { BikePointDropdown } from "../features/DropdownLists";
import { Searchbar } from "../features/Searchbar/";

function LoginPage({
  activeList,
  setActiveList,
}: {
  activeList: BikePointList | undefined;
  setActiveList: React.Dispatch<
    React.SetStateAction<BikePointList | undefined>
  >;
}) {
  const [bikePointLists, setBikePointLists] = useState<
    BikePointList[] | undefined
  >();
  const [bikePoints, setBikePoints] = useState<BikePoint[]>();
  const token = useRetrieveJWT();

  useEffect(() => {
    const fetchList = async () => {
      if (token) {
        const data = await loadBikePointLists(token);
        setBikePointLists(data);
        if (data && !activeList) {
          setActiveList(data[0]);
        }
      }
    };
    fetchList();
  }, [token]);

  useEffect(() => {
    const fetchBikePoints = async () => {
      if (token && activeList) {
        const data = await loadBikePoints(token, activeList);
        setBikePoints(data);
      }
    };
    fetchBikePoints();
  }, [token, activeList]);

  if (!activeList) {
    return (
      <>
        <Searchbar activeListId={0} />
        <BikePointDropdown
          bikePointLists={bikePointLists}
          setBikePointLists={setBikePointLists}
          activeList={activeList}
          setActiveList={setActiveList}
          token={token}
        />
      </>
    );
  }

  const bikePointCards = bikePoints?.map((bikePoint) => {
    return (
      <div key={uuidv4()}>
        <BikePointCard
          token={token}
          stationName={bikePoint.commonName}
          stationId={bikePoint.id}
          list={activeList.id}
          bikeLeft={bikePoint.NbBikes}
          ebikeLeft={bikePoint.NbEbikes}
          spaceLeft={bikePoint.NbEmptyDocks}
        ></BikePointCard>
      </div>
    );
  });

  return (
    <>
      <Searchbar activeListId={activeList.id} />
      <BikePointDropdown
        bikePointLists={bikePointLists}
        setBikePointLists={setBikePointLists}
        activeList={activeList}
        setActiveList={setActiveList}
        token={token}
      />
      <div className="cardsContainer">{bikePointCards}</div>
    </>
  );
}

export default LoginPage;
