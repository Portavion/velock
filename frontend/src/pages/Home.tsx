import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loadBikePointLists } from "../utils/loadBikePointLists";
import { loadBikePoints } from "../utils/loadBikePoints";
import { useRetrieveJWT } from "../utils/retrieveJWT";
import { v4 as uuidv4 } from "uuid";

import { Search } from "lucide-react";

import { BikePointCard } from "../features/BikePointCards/BikePointCard/BikePointCard";
import { BikePointDropdown } from "../features/DropdownLists";

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

  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  function redirectToSearchPage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(
      `/search?address=${address.replaceAll(" ", "+")}&activelist=${activeList?.id}`,
    );
  }

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

  // if (!activeList) {
  //   return <></>;
  // }

  const bikePointCards = bikePoints?.map((bikePoint) => {
    return (
      <div key={uuidv4()}>
        <BikePointCard
          token={token}
          stationName={bikePoint.commonName}
          stationId={bikePoint.id}
          list={activeList?.id || 0}
          bikeLeft={bikePoint.NbBikes}
          ebikeLeft={bikePoint.NbEbikes}
          spaceLeft={bikePoint.NbEmptyDocks}
        ></BikePointCard>
      </div>
    );
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Bike Stations</h1>
      {/* Search bar */}
      <form
        className="mb-4 flex flex-col items-center"
        onSubmit={redirectToSearchPage}
      >
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search stations..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-80 max-w-md p-2 pl-2 border border-gray-300 rounded-md"
          />
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        </div>
      </form>

      {/* <Searchbar activeListId={activeList.id} /> */}
      <BikePointDropdown
        bikePointLists={bikePointLists}
        setBikePointLists={setBikePointLists}
        activeList={activeList}
        setActiveList={setActiveList}
        token={token}
      />
      <div className="space-y-4 flex flex-col items-center">
        {bikePointCards}
      </div>
    </>
  );
}

export default LoginPage;
