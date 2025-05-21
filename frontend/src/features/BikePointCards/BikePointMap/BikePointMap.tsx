import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { LatLngTuple } from "leaflet";
// import L, { LatLngTuple } from "leaflet";
// delete L.Icon.Default.prototype._getIconUrl;
//
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });
interface BikePointMapProps {
  x: number;
  y: number;
  isMapVisible: boolean;
}

export default function BikePointMap({
  x,
  y,
  isMapVisible,
}: BikePointMapProps) {
  const position: LatLngTuple = [x, y];

  return isMapVisible ? (
    <>
      <div>Map View</div>
      <MapContainer
        center={position}
        zoom={17}
        className="h-64 w-full rounded-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  ) : (
    <></>
  );
}
