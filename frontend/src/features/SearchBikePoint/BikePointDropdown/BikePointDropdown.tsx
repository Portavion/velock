// import React from "react";
import { useEffect, useState } from "react";
import { useRetrieveJWT } from "../../../utils/retrieveJWT";
import styles from "./BikePointDropdown.module.css";

interface BikePointList {
  id: number;
  name: string;
  bikePointsIds: string[];
  userId: number;
}

interface BikePointListResponse {
  bikePointsLists: BikePointList[];
}

async function loadDropdownLists(token: string) {
  try {
    const bikePointListsResponse = await fetch(
      "http://localhost:3000/api/v1/bikepointslists",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const bikePointLists: BikePointListResponse =
      await bikePointListsResponse.json();
    return bikePointLists;
  } catch (error) {
    console.log(error);
    return { bikePointsLists: [] };
  }
}

function BikePointDropdown() {
  const [bikePointLists, setBikePointLists] = useState<
    BikePointListResponse | undefined
  >();
  const token = useRetrieveJWT();

  useEffect(() => {
    const fetchList = async () => {
      if (token) {
        const data = await loadDropdownLists(token);
        setBikePointLists(data);
      }
    };
    fetchList();
  }, [token]);

  console.log(bikePointLists?.bikePointsLists);

  return (
    <>
      <select
        className={styles.dropdown}
        name="BikePointListsDropdown"
        id="BikePointListsDropdown"
      >
        {bikePointLists?.bikePointsLists.map((list) => (
          <option key={list.id} value={list.name}>
            {list.name}
          </option>
        ))}
        {/* {listOptions} */}
      </select>
    </>
  );
}

export { BikePointDropdown };
