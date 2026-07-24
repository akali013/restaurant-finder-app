import { GooglePlace } from "@/app/lib/data";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantMapEntry from "./RestaurantMapEntry";
import NoPlacesFound from "./NoPlacesFound";

export default function RestaurantList(
  { places, filtersActive, savedRestaurants }:
    { places: GooglePlace[], filtersActive: boolean, savedRestaurants: GooglePlace[] }
) {
  return (
    <div className="flex flex-col max-h-screen overflow-y-auto overflow-x-hidden scrollbar-none">
      <RestaurantHeader filtersActive={filtersActive} />
      {places.length > 0 ?
        (
          places.map(place => (
            <RestaurantMapEntry key={place.id} place={place} savedRestaurants={savedRestaurants} />
          ))
        ) : (
          <NoPlacesFound filtersActive={filtersActive} />
        )}
    </div>
  );
}