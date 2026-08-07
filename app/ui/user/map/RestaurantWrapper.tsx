"use client";

import { GooglePriceLevel, ListFilterType, OtherFiltersType, PlaceType, Preference } from "@/app/lib/data";
import useGooglePlaces from "@/app/lib/hooks/useGooglePlaces";
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";
import useUserLocation from "@/app/lib/hooks/useUserLocation";
import { applyFilters, applyPreference } from "@/app/lib/placeFiltering";
import { APIProvider } from "@vis.gl/react-google-maps";
import { convertMilesToMeters } from "@/app/lib/placeFormatting";
import MapPageSkeleton from "./MapPageSkeleton";
import useSavedRestaurants from "@/app/lib/hooks/useSavedRestaurants";
import { useMemo } from "react";


// Wrapper component that provides Google's Nearby Search API or Text Search API locations to the child Map components
export default function RestaurantWrapper({ listType, miles, placeTypes, priceLevel, otherFilters, preference, preferencePlaceTypes, query }: {
  listType: ListFilterType,
  miles: number,
  placeTypes: PlaceType[],
  priceLevel: GooglePriceLevel | "",
  otherFilters: OtherFiltersType,
  preference?: Preference,
  preferencePlaceTypes?: PlaceType[],
  query?: string
}) {
  // Call hooks first since they can't be called conditionally
  const userLocation = useUserLocation();
  const googleRestaurants = useGooglePlaces(userLocation, listType, miles, placeTypes);
  const [savedRestaurants, setSavedRestaurants] = useSavedRestaurants(listType);
  const preferredRestaurants = useGooglePlaces(userLocation, listType, miles, preferencePlaceTypes);

  // Check if any filters are active 
  const filtersActive = miles != 0 ||
    placeTypes.length > 0 ||
    priceLevel != "" ||
    otherFilters.rating?.length! > 0 ||
    otherFilters.openingHours?.length! > 0 ||
    otherFilters.amenities?.length! > 0;

  // useMemo is to cache the locations array so it does not change or redo filtering every render
  let locations = useMemo(() => {
    let filteredLocations = [];

    switch (listType) {
      case "Saved": {
        filteredLocations = savedRestaurants.slice();
        break;
      }
      case "Recommended": {
        filteredLocations = preferredRestaurants.slice();
        break;
      }
      default: {
        filteredLocations = googleRestaurants.slice();
      }
    }

    // This is used for filtering the locations based on the list type where
    // the user's preference is applied for the recommended section and generic filters
    // are applied for the all and saved sections.
    if (listType === "Recommended") {
      filteredLocations = applyPreference(preference, filteredLocations);

      // Allows the user to apply the other filters to their recommended restaurants
      if (filtersActive) {
        filteredLocations = applyFilters(priceLevel, otherFilters, filteredLocations, placeTypes);
      }
    }
    else {
      filteredLocations = applyFilters(priceLevel, otherFilters, filteredLocations);
    }

    return filteredLocations;
  }, [listType, savedRestaurants, preferredRestaurants, googleRestaurants, filtersActive, otherFilters, placeTypes, preference, priceLevel]);


  // Render the map when the user's location is given and the locations are retrieved
  if (userLocation.lat === 0 && userLocation.lng === 0) return <MapPageSkeleton />;

  return (
    <>
      {/* Import the Google Maps API with the Places library */}
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
        onLoad={() => console.log("Maps API has loaded.")}
        onError={() => { throw new Error("Cannot load Maps API.") }}  // This will load /map/error.tsx  
      >
        <RestaurantList
          places={locations}
          filtersActive={filtersActive}
          savedRestaurants={savedRestaurants}
          setSavedRestaurants={setSavedRestaurants}
          preference={preference}
        />
        <RestaurantMap userLocation={userLocation} meters={convertMilesToMeters(miles)} places={locations} />
      </APIProvider>
    </>
  );
}
