"use client";

import { GooglePlace, GooglePriceLevel, ListFilterType, OtherFiltersType, PlaceType } from "@/app/lib/data";
import useNearbySearch from "@/app/lib/hooks/useNearbySearch";
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";
import useUserLocation from "@/app/lib/hooks/useUserLocation";
import { applyFilters } from "@/app/lib/placeFiltering";
import { APIProvider } from "@vis.gl/react-google-maps";
import { convertMilesToMeters } from "@/app/lib/placeFormatting";
import MapPageSkeleton from "./MapPageSkeleton";
import useSavedRestaurants from "@/app/lib/hooks/useSavedRestaurants";


// Wrapper component that provides the locations to the child Map components
export default function NearbySearchWrapper({ listType, miles, placeTypes, priceLevel, otherFilters }: {
  listType: ListFilterType,
  miles: number,
  placeTypes: PlaceType[],
  priceLevel: GooglePriceLevel | "",
  otherFilters: OtherFiltersType,
}) {
  // Call hooks first since they can't be called conditionally
  const userLocation = useUserLocation();
  const nearbyRestaurants = useNearbySearch(userLocation, listType, miles, placeTypes);
  const [savedRestaurants, setSavedRestaurants] = useSavedRestaurants(listType);

  let originalLocations: GooglePlace[] = [];

  switch (listType) {
    case "Saved": {
      originalLocations = savedRestaurants.slice();
      break;
    }
    default: {
      originalLocations = nearbyRestaurants.slice();
    }
  }

  let locations = applyFilters(priceLevel, otherFilters, originalLocations || []);    // This is used for filtering the originalLocations

  // Check if any filters are active 
  const filtersActive = miles != 0 ||
    placeTypes.length > 0 ||
    priceLevel != "" ||
    otherFilters.rating?.length! > 0 ||
    otherFilters.openingHours?.length! > 0 ||
    otherFilters.amenities?.length! > 0;


  // Render the map when the user's location is given and the locations are retrieved
  if (userLocation.lat === 0 && userLocation.lng === 0) return <MapPageSkeleton />;

  return (
    <>
      {/* Import the Google Maps API with the Places library */}
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
        onLoad={() => console.log("Maps API has loaded.")
        }
      >
        <RestaurantList
          places={locations}
          filtersActive={filtersActive}
          savedRestaurants={savedRestaurants}
          setSavedRestaurants={setSavedRestaurants}
        />
        <RestaurantMap userLocation={userLocation} meters={convertMilesToMeters(miles)} places={locations} />
      </APIProvider>
    </>
  );
}
