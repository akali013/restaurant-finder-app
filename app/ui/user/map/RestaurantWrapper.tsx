"use client";

import { getSavedRestaurants, GooglePlace, GooglePriceLevel, ListFilterType, MapsAPIResponse, OtherFiltersType, PlaceType, Preference } from "@/app/lib/data";
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";
import useUserLocation from "@/app/lib/hooks/useUserLocation";
import { applyFilters, applyPreference } from "@/app/lib/placeFiltering";
import { APIProvider } from "@vis.gl/react-google-maps";
import { convertMilesToMeters } from "@/app/lib/placeFormatting";
import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import MapPageSkeleton from "./MapPageSkeleton";

// Wrapper component that provides Google's Nearby Search API or Text Search API locations to the child Map components
export default function RestaurantWrapper({ listType, miles, placeTypes, priceLevel, otherFilters, preference, preferencePlaceTypes, query, savedRestaurantIds }: {
  listType: ListFilterType,
  miles: number,
  placeTypes: PlaceType[],
  priceLevel: GooglePriceLevel | "",
  otherFilters: OtherFiltersType,
  preference?: Preference,
  preferencePlaceTypes?: PlaceType[],
  query?: string,
  savedRestaurantIds: string[]
}) {
  // Call hooks first since they can't be called conditionally
  const userLocation = useUserLocation();
  const { data } = useSuspenseQuery({
    queryKey: ["googleRestaurants", userLocation, miles, query, placeTypes, preferencePlaceTypes, listType, savedRestaurantIds],
    queryFn: async () => {
      // Call the Text Search API or the Nearby Search API based on if a user passes a query
      if (query) return await getTextSearchRestaurants(userLocation, miles, query)

      // Make different calls to the Google Maps API based on the list type
      if (listType === "All") return await searchNearbyRestaurants(userLocation, miles, placeTypes);
      if (listType === "Saved") return await getSavedRestaurants(savedRestaurantIds);
      if (listType === "Recommended") return await searchNearbyRestaurants(userLocation, miles, preferencePlaceTypes);
    },
    staleTime: 60 * 1000 * 10
  });

  const googleRestaurants = data?.places;

  // Check if any filters are active 
  const filtersActive = miles != 0 ||
    placeTypes.length > 0 ||
    priceLevel != "" ||
    otherFilters.rating?.length! > 0 ||
    otherFilters.openingHours?.length! > 0 ||
    otherFilters.amenities?.length! > 0;

  // useMemo is to cache the locations array so it does not change or redo filtering every render
  let locations = useMemo(() => {
    let filteredLocations = googleRestaurants?.slice() || [];

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
      filteredLocations = applyFilters(priceLevel, otherFilters, filteredLocations, placeTypes);
    }

    return filteredLocations;
  }, [listType, googleRestaurants, filtersActive, otherFilters, placeTypes, preference, priceLevel]);

  // Do not load the page until the user's location is found
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
        <div className="w-[calc(100%)] flex max-md:flex-col h-screen">
          <RestaurantList
            places={locations}
            filtersActive={filtersActive}
            savedRestaurantIds={savedRestaurantIds}
            listType={listType}
            preference={preference}
          />

          <RestaurantMap userLocation={userLocation} meters={convertMilesToMeters(miles)} places={locations} />
        </div>
      </APIProvider>
    </>
  );
}

// Get restaurants from the Nearby Search API
async function searchNearbyRestaurants(userLocation: { lat: number, lng: number }, miles: number, primaryTypes?: PlaceType[]) {
  if (userLocation.lat === 0 && userLocation.lng === 0) return null;

  const radius = convertMilesToMeters(miles || 10);
  const placeTypes = primaryTypes?.length! > 0 ? primaryTypes?.map(type => type.name) : ["restaurant"];
  const response = await fetch(`/api/nearbySearch?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}&primaryTypes=${placeTypes}`);
  const data = await response.json() as MapsAPIResponse;
  return data;
}

// Get restaurants from the Text Search API
async function getTextSearchRestaurants(userLocation: { lat: number, lng: number }, radius: number, query: string) {
  if (userLocation.lat === 0 && userLocation.lng === 0) return null;

  const response = await fetch(`/api/textSearch?query=${query}&lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`);
  const data = await response.json() as MapsAPIResponse;
  return data;
}
