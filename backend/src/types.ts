export interface BikePoint {
  id: string;
  commonName: string;
  locked: boolean;
  NbBikes: number;
  NbEmptyDocks: number;
  NbDocks: number;
  NbStandardBikes: number;
  NbEBikes: number;
  lat: number;
  lon: number;
}

export interface BikePointTfL {
  id: string;
  commonName: string;
  additionalProperties: AdditionalProperty[];
  locked: boolean;
  NbBikes: number;
  NbEmptyDocks: number;
  NbDocks: number;
  NbStandardBikes: number;
  NbEBikes: number;
  lat: number;
  lon: number;
}

interface AdditionalProperty {
  $type: string;
  category: string;
  key: string;
  sourceSystemKey: string;
  value: number;
  modified: string;
}
