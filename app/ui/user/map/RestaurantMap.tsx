import { Map } from "@vis.gl/react-google-maps";
import MapMarkers from "./MapMarkers";
import { NearbySearchResponsePlace } from "@/app/lib/data";


export default function RestaurantMap({ userLocation, places }: { userLocation: { lat: number, lng: number }, places: NearbySearchResponsePlace[] }) {
  const defaultZoom = 13;

  return (
    <>
      {
        <Map
          defaultZoom={defaultZoom}
          defaultCenter={userLocation}
          mapId="DEMO_MAP_ID"   // Enables advanced markers
          className="h-screen w-[66vw]"
        >
          {places && <MapMarkers places={places} />}
        </Map>
      }
    </>
  );
}
