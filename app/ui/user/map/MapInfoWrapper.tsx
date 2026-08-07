import { getPreferenceInfo } from "@/app/lib/actions";
import RestaurantWrapper from "./RestaurantWrapper";
import { GooglePriceLevel, ListFilterType, OtherFiltersType, PlaceType } from "@/app/lib/data";

// This must be a server component so it can call async server actions for data the map needs, such as preferences
export default async function MapInfoWrapper({ query, listType, miles, placeTypes, priceLevel, otherFilters }:
  {
    query: string,
    listType: ListFilterType
    miles: number,
    placeTypes: PlaceType[],
    priceLevel: GooglePriceLevel | "",
    otherFilters: OtherFiltersType
  }
) {
  const preferenceInfo = await getPreferenceInfo();

  return (
    <RestaurantWrapper
      listType={listType}
      miles={miles}
      placeTypes={placeTypes}
      priceLevel={priceLevel}
      otherFilters={otherFilters}
      preference={preferenceInfo.preference}
      preferencePlaceTypes={preferenceInfo.preferencePlaceTypes}
      query={query}
    />
  );
}