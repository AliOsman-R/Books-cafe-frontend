import React, { useState } from "react";
// import {
//   GoogleMap,
//   GoogleMapsMarkerClusterer,
//   Marker,
// } from "@react-google-maps/api";

const Map = ({ center, onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMarkerDragEnd = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    onLocationChange(markerPosition);
  };

  return (
    // <GoogleMapsMarkerClusterer
    //   center={center}
    //   zoom={8}
    //   mapContainerStyle={{ height: "400px", width: "100%" }}
    // >
    //   <Marker
    //     position={markerPosition}
    //     draggable={true}
    //     onDragEnd={handleMarkerDragEnd}
    //   />
    // </GoogleMapsMarkerClusterer>
    <div className=""></div>
  );
};

export default Map;
