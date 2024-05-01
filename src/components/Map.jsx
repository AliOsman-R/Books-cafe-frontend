import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from 'leaflet';

const Map = ({ cafes }) => {
  const center = [3.1582811161591784, 101.7122779878382]
  const centers = cafes.length === 1? [cafes[0].coordinates[1], cafes[0].coordinates[0]] : center

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38] // size of the icon
  });

  return (
    <MapContainer center={centers} zoom={cafes.length === 1? 14 : 10} >
     <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {cafes.map((cafe, index) => (
          <Marker key={index} icon={customIcon} position={[cafe.coordinates[1], cafe.coordinates[0]]}>
            <Popup>{cafe.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
