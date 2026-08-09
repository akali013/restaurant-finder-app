"use client";

import { Map, Circle } from "@vis.gl/react-google-maps";
import MapMarkers from "./MapMarkers";
import { GooglePlace } from "@/app/lib/data";

export default function RestaurantMap({ userLocation, meters, places }: {
  userLocation: { lat: number, lng: number },
  meters: number,
  places: GooglePlace[]
}) {
  const defaultZoom = 13;

  return (
    <>
      {
        <Map
          defaultZoom={defaultZoom}
          defaultCenter={userLocation}
          mapId="DEMO_MAP_ID"   // Enables advanced markers
          className="md:w-full flex-2"
        >
          {meters > 0 &&
            <Circle
              center={userLocation}
              radius={meters}
              fillColor={"#bae6fd"}
              fillOpacity={0.25}
              strokeColor={"#38bdf8"}
              strokeWeight={5}
            />
          }
          {places && <MapMarkers places={places} />}
        </Map>
      }
    </>
  );
}
