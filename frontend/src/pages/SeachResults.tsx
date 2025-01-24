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

  if (!address) {
    address = "";
  }
  console.log(address);

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
          bikeLeft={bikePoint.NbBikes}
          ebikeLeft={bikePoint.NbEbikes}
          spaceLeft={bikePoint.NbEmptyDocks}
        ></BikePointResult>
      </div>
    );
  });

  return <>{bikePointResults}</>;
}
