"use client";

import { GooglePlace } from "@/app/lib/data";
import { useAdvancedMarkerRef, AdvancedMarker, Pin, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { useState, useCallback } from "react";
import InfoWindowContent from "./InfoWindowContent";

export default function MapMarker({ place }: { place: GooglePlace }) {
  // Connect the marker to its associated InfoWindow
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const map = useMap();

  const handleClick = useCallback(
    (e: google.maps.marker.AdvancedMarkerClickEvent, place: GooglePlace) => {
      if (!map) return;
      if (!e.target) return;    // The marker that was clicked

      map.panTo({ lat: place.location.latitude, lng: place.location.longitude });   // Focus the map on the clicked marker
      setShowInfoWindow(s => !s)
    },
    [map]
  );

  // Synchronize the state if the InfoWindow closes for any reason
  const handleClose = useCallback(() => setShowInfoWindow(false), []);

  const locationPosition = { lat: place.location.latitude, lng: place.location.longitude };

  return (
    <>
      <AdvancedMarker
        key={place.id}
        ref={markerRef}
        position={locationPosition}
        clickable={true}
        onClick={(e) => handleClick(e, place)}
        title={place.displayName.text}
      >
        <Pin background={place.iconBackgroundColor} glyphSrc={`${place.iconMaskBaseUri}.png`} />
      </AdvancedMarker>

      {showInfoWindow && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <InfoWindowContent place={place} />
        </InfoWindow>
      )}
    </>
  );

}