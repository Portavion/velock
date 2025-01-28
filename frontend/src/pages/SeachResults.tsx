import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { getSearchResults } from "../utils/getSearchResults.tsx";
import { useRetrieveJWT } from "../utils/retrieveJWT";

import { BikePointResult } from "../features/Searchbar/BikePointResult/BikePointResult";

export function SearchResults() {
  const [searchResults, setSearchResults] = useState<BikePoint[]>();
  const [searchParams] = useSearchParams();
  const token = useRetrieveJWT();

  let address = searchParams.get("address")?.replaceAll(" ", "+");
  const activeListId = searchParams.get("activelist")
    ? Number(searchParams.get("activelist"))
    : null;

  if (!address) {
    address = "";
  }

  useEffect(() => {
    const searchBikePoints = async (token: string, address: string) => {
      const data = await getSearchResults(token, address);
      setSearchResults(data);
    };
    searchBikePoints(token, address);
  }, [token, address]);

  if (!searchResults) {
    return <div>No docking stations found.</div>;
  }

  const bikePointResults = searchResults?.map((bikePoint) => {
    return (
      <div key={uuidv4()}>
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

  return <>{bikePointResults}</>;
}
