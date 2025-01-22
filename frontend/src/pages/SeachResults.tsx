import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { getSearchResults } from "../utils/getSearchResults.tsx";
import { useRetrieveJWT } from "../utils/retrieveJWT";

import { BikePointCard } from "../features/BikePointCards/BikePointCard/BikePointCard";

export function SearchResults() {
  const [searchResults, setSearchResults] = useState<BikePoint[]>();
  const [searchParams] = useSearchParams();
  const token = useRetrieveJWT();

  let address = searchParams.get("address")?.replaceAll(" ", "+");

  if (!address) {
    address = "";
  }

  useEffect(() => {
    const searchBikePoints = async (token: string, address: string) => {
      const data = await getSearchResults(token, address);
      setSearchResults(data);
    };
    searchBikePoints(token, address);
  }, [token]);

  if (!searchResults) {
    return <div>No docking stations found.</div>;
  }

  const bikePointCards = searchResults?.map((bikePoint) => {
    return (
      <BikePointCard
        stationName={bikePoint.commonName}
        bikeLeft={bikePoint.NbBikes}
        ebikeLeft={bikePoint.NbEbikes}
        spaceLeft={bikePoint.NbEmptyDocks}
      ></BikePointCard>
    );
  });

  return <>{bikePointCards}</>;
}
