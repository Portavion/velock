/// <reference types="vite/client" />
interface BikePointList {
  id: number;
  name: string;
  bikePointsIds: string[];
  userId: number;
  // [Symbol.iterator](): Iterator<BikePointList>;
}

type DeleteListButton = {
  activeListName: string | undefined;
  bikePointLists: BikePointList[];
  setBikePointLists: React.Dispatch<
    React.SetStateAction<BikePointList[] | undefined>
  >;
  token: string;
};

type AddListButton = {
  bikePointLists: BikePointList[];
  setBikePointLists: React.Dispatch<
    React.SetStateAction<BikePointList[] | undefined>
  >;
  setActiveList: React.Dispatch<React.SetStateAction<string | undefined>>;
  token: string;
};

type BikePoint = {
  id: string;
  commonName: string;
  locked: boolean;
  NbBikes: number;
  NbEmptyDocks: number;
  NbDocks: number;
  NbStandardBikes: number;
  NbEbikes: number;
  lat: number;
  lon: number;
};
