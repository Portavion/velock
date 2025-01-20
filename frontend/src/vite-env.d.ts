/// <reference types="vite/client" />
interface BikePointList {
  id: number;
  name: string;
  bikePointsIds: string[];
  userId: number;
  // [Symbol.iterator](): Iterator<BikePointList>;
}

type DeleteListButton = {
  activeList: string | undefined;
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
