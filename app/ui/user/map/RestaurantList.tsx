import { GooglePlace, ListFilterType, Preference } from "@/app/lib/data";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantMapEntry from "./RestaurantMapEntry";
import NoPlacesFound from "./NoPlacesFound";

export default function RestaurantList(
  { places, filtersActive, savedRestaurantIds, listType, preference }:
    {
      places: GooglePlace[],
      filtersActive: boolean,
      savedRestaurantIds: string[],
      listType: ListFilterType,
      preference?: Preference
    }
) {

  return (
    <div className="flex flex-col max-h-screen overflow-y-auto overflow-x-hidden scrollbar-none lg:w-[34vw]">
      <RestaurantHeader filtersActive={filtersActive} />
      <div className="max-md:flex max-md:overflow-x-auto">
        {places.length > 0 ?
          (
            places.map(place => (
              <RestaurantMapEntry key={place.id} place={place} savedRestaurantIds={savedRestaurantIds} />
            ))
          ) : (
            <NoPlacesFound filtersActive={filtersActive} listType={listType} preference={preference} />
          )}
      </div>
    </div>
  );
}