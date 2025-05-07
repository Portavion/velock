import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router";

import { loadBikePointLists } from "../utils/loadBikePointLists";
import { loadBikePoints } from "../utils/loadBikePoints";
import { v4 as uuidv4 } from "uuid";

import { Search, ChevronUp, ChevronDown } from "lucide-react";

import { BikePointCard } from "../features/BikePointCards/BikePointCard/BikePointCard";
import { BikePointDropdown } from "../features/DropdownLists";
import { AuthContext } from "../contexts/AuthContext";

interface LoginPageProps {
  activeList: BikePointList | undefined;
  setActiveList: React.Dispatch<
    React.SetStateAction<BikePointList | undefined>
  >;
}

function LoginPage({ activeList, setActiveList }: LoginPageProps) {
  const [bikePointLists, setBikePointLists] = useState<
    BikePointList[] | undefined
  >();
  const [searchParams] = useSearchParams();
  const [bikePoints, setBikePoints] = useState<BikePoint[]>();
  const token = useContext(AuthContext);
  const activeListId = Number(searchParams.get("activeListId"));
  const [isEditingModal, setIsEditingModal] = useState(false);

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
          if (data && activeListId) {
            const matchingActiveList = data.filter(
              (list) => list.id === activeListId,
            );
            setActiveList(matchingActiveList[0]);
            console.log(activeList);
          } else {
            setActiveList(data[0]);
          }
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

  const bikePointCards = bikePoints?.map((bikePoint) => {
    return (
      <div className="flex relative">
        {isEditingModal && (
          <div className="flex flex-col justify-center absolute -left-9 top-1/2 bottom-1/2">
            <button
              onClick={() => alert("Up")}
              type="button"
              className="bg-teal-900 text-teal-950 text-center p-1 m-0.5 rounded-md  "
            >
              <ChevronUp className="w-5 h-5 rounded-md" />
            </button>
            <button
              onClick={() => alert("Down")}
              type="button"
              className="bg-teal-900 text-teal-950 text-center p-1 m-0.5 rounded-md"
            >
              <ChevronDown className="w-5 h-5 rounded-md" />
            </button>
          </div>
        )}
        <div key={uuidv4()}>
          <BikePointCard
            stationId={bikePoint.id}
            list={activeList?.id || 0}
            bikePoints={bikePoints}
            setBikePoints={setBikePoints}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      {/* <h1 className="text-2xl font-bold mb-4">Bike Stations</h1> */}
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
        isEditingModal={isEditingModal}
        setIsEditingModal={setIsEditingModal}
      />
      <div className="space-y-4 flex flex-col items-center">
        {bikePointCards}
      </div>
    </>
  );
}

export default LoginPage;
