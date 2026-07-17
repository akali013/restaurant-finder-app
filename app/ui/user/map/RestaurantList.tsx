import { NearbySearchResponsePlace, OtherFiltersType, PlaceType } from "@/app/lib/data";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantMapEntry from "./RestaurantMapEntry";
import NoPlacesFound from "./NoPlacesFound";
import { MouseEventHandler } from "react";

export default function RestaurantList(
  { places, miles, onMilesChange, onPriceFilter, onOtherFilters, filtersActive, onClearFilters }:
    {
      places: NearbySearchResponsePlace[],
      miles: number,
      onMilesChange: (miles: number) => void,
      onPriceFilter: (priceLevel: "" | "Low" | "Medium" | "Expensive" | "Very Expensive" | "Unspecified") => void,
      onOtherFilters: (placeTypes: PlaceType[], otherFilters: OtherFiltersType) => void,
      filtersActive: boolean,
      onClearFilters: MouseEventHandler<HTMLButtonElement>
    }) {
  return (
    <div className="flex flex-col max-h-screen overflow-y-auto overflow-x-hidden scrollbar-none">
      <RestaurantHeader
        miles={miles}
        onMilesChange={onMilesChange}
        onPriceFilter={onPriceFilter}
        onOtherFilters={onOtherFilters}
        filtersActive={filtersActive}
        onClearFilters={onClearFilters}
      />
      {places.length > 0 ?
        (
          places.map(place => (
            <RestaurantMapEntry key={place.id} place={place} />
          ))
        ) : (
          <NoPlacesFound />
        )}
    </div>
  );
}