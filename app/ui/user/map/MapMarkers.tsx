import { NearbySearchResponsePlace } from "@/app/lib/data";
import MapMarker from "./MapMarker";

export default function MapMarkers({ places }: { places: NearbySearchResponsePlace[] }) {
  return (
    <>
      {places.map(place => {
        return (
          <MapMarker key={place.id} place={place} />
        );
      })}
    </>
  );
}

