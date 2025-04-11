import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { getSearchResults } from "../utils/getSearchResults.tsx";

import { BikePointResult } from "../features/Searchbar/BikePointResult/BikePointResult";
import { Loader } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext.ts";

export function SearchResults() {
  const [searchResults, setSearchResults] = useState<BikePoint[]>();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = useContext(AuthContext);

  let address = searchParams.get("address")?.replaceAll(" ", "+");
  const activeListId = searchParams.get("activelist")
    ? Number(searchParams.get("activelist"))
    : null;

  if (!address) {
    address = "";
  }

  useEffect(() => {
    const searchBikePoints = async (token: string, address: string) => {
      try {
        const data = await getSearchResults(token, address);
        if (data[0].commonName) {
          setSearchResults(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    searchBikePoints(token, address);
  }, [token, address]);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-5/6">
          <Loader className="animate-spin w-12 h-12 text-teal-200" />
        </div>
        <a
          className="text-teal-500 underline"
          href={`/?activeListId=${activeListId}`}
        >
          Go back
        </a>
      </>
    );
  }

  if (!searchResults && !isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-5/6">
          <div>No docking stations found.</div>
          <a
            className="text-teal-500 underline"
            href={`/?activeListId=${activeListId}`}
          >
            Go back
          </a>
        </div>
      </>
    );
  }

  const bikePointResults = searchResults?.map((bikePoint) => {
    return (
      <div key={uuidv4()} className="flex justify-center">
        <BikePointResult
          stationName={bikePoint.commonName}
          stationId={bikePoint.id}
          bikeLeft={bikePoint.NbBikes}
          ebikeLeft={bikePoint.NbEbikes}
          spaceLeft={bikePoint.NbEmptyDocks}
          activeListId={activeListId}
        ></BikePointResult>
      </div>
    );
  });

  return (
    <>
      <a
        className="text-teal-500 underline"
        href={`/?activeListId=${activeListId}`}
      >
        Go back
      </a>
      {bikePointResults}
    </>
  );
}
