"use client";

import RestaurantMap from "@/app/ui/user/map/RestaurantMap";
import RestaurantList from "../ui/user/map/RestaurantList";
import { useState } from "react";
import { NearbySearchResponsePlace, OtherFiltersType, PlaceType } from "@/app/lib/data";
import { APIProvider } from "@vis.gl/react-google-maps";
import useUserLocation from "@/app/lib/hooks/useUserLocation";
import useNearbySearch from "@/app/lib/hooks/useNearbySearch";

export default function MapPage() {
  const userLocation = useUserLocation();

  // Server side filters supported by Nearby Search API
  const [miles, setMiles] = useState(0);    // Search radius in miles for distance filter
  const [placeTypes, setPlaceTypes] = useState<PlaceType[]>([]);      // Place types in the other filters

  // Client side filters
  const [priceLevel, setPriceLevel] = useState<"" | "Low" | "Medium" | "Expensive" | "Very Expensive" | "Unspecified">("");
  const [otherFilters, setOtherFilters] = useState<OtherFiltersType>({});

  const originalLocations = useNearbySearch(userLocation, miles, placeTypes);
  let locations = applyFilters(priceLevel, otherFilters, originalLocations || []);    // This is used for filtering the originalLocations

  // Render the map when the user's location is given and the locations are retrieved
  if (userLocation.lat === 0 && userLocation.lng === 0) return <h1>Loading...</h1>;

  // Check if any filters are active 
  const filtersActive = miles != 0 || placeTypes.length > 0 || priceLevel != "" || otherFilters.rating?.length! > 0 || otherFilters.openingHours?.length! > 0 || otherFilters.amenities?.length! > 0;

  return (
    <div className="flex bg-mauve-300">
      {/* Import the Google Maps API with the Places library */}
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <RestaurantList
          places={locations}
          miles={miles}
          onMilesChange={setMiles}
          onPriceFilter={setPriceLevel}
          onOtherFilters={(placeTypes: PlaceType[], otherFilters: OtherFiltersType) => {
            setPlaceTypes(placeTypes);
            setOtherFilters(otherFilters);
          }}
          filtersActive={filtersActive}
          onClearFilters={clearFilters}
        />
        <RestaurantMap userLocation={userLocation} places={locations} />
      </APIProvider>
    </div>
  );

  function clearFilters() {
    setMiles(0);
    setPlaceTypes([]);
    setPriceLevel("");
    setOtherFilters({});
  }
}


// Applies the client side filters from the other filters dialog in RestaurantHeader
function applyFilters(
  priceLevel: "" | "Low" | "Medium" | "Expensive" | "Very Expensive" | "Unspecified",
  otherFilters: OtherFiltersType,
  originalLocations: NearbySearchResponsePlace[]
): NearbySearchResponsePlace[] {
  let filteredLocations = [];

  // Allows the user to filter places by price level
  switch (priceLevel) {
    case "Low": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_INEXPENSIVE" || place.priceLevel === "PRICE_LEVEL_FREE");
      break;
    }
    case "Medium": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_MODERATE");
      break;
    }
    case "Expensive": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_EXPENSIVE");
      break;
    }
    case "Very Expensive": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_VERY_EXPENSIVE");
      break;
    }
    case "Unspecified": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_UNSPECIFIED" || !place.priceLevel);
      break;
    }
    default: {
      filteredLocations = originalLocations.slice();
      break;
    }
  };

  // Filter by rating range
  if (otherFilters.rating) {
    const minRating = otherFilters.rating[0];
    const maxRating = otherFilters.rating[1];
    filteredLocations = filteredLocations.filter(place => place.rating && place.rating >= minRating && place.rating <= maxRating);
  }

  // Filter by opening hours
  if (otherFilters.openingHours) {
    const startHour = otherFilters.openingHours[0];
    const endHour = otherFilters.openingHours[1];
    const currentDay = new Date().getDay();

    filteredLocations = filteredLocations.filter(place => {
      let placeOpenHour = 0;
      let placeCloseHour = 23;

      // Get the place's opening and closing hours for the current weekday
      if (place.currentOpeningHours && place.currentOpeningHours.periods) {
        place.currentOpeningHours.periods.forEach((period) => {
          if (period.open.day === currentDay) {
            placeOpenHour = period.open.hour;
            placeCloseHour = period.close.hour;
          }
        });
      }

      return place.currentOpeningHours && (startHour >= placeOpenHour || endHour < placeCloseHour);
    });
  }

  // Filter by amenities
  if (otherFilters.amenities) {
    filteredLocations = filteredLocations.filter(place => {
      let hasAmenities = true;    // Tracks if each place has all amenities

      otherFilters.amenities!.map(amenity => {
        // Only match places that include all amenities
        switch (amenity) {
          case "Accepts Card": {
            if (!place.paymentOptions?.acceptsCreditCards) hasAmenities = false;
            break;
          }
          case "Accepts Cash": {
            if (!place.paymentOptions?.acceptsCashOnly) hasAmenities = false;
            break;
          }
          case "Vegetarian": {
            if (!place.servesVegetarianFood) hasAmenities = false;
            break;
          }
          case "Takeout": {
            if (!place.takeout) hasAmenities = false;
            break;
          }
          case "Accessible": {
            if (!place.accessibilityOptions) hasAmenities = false;
            break;
          }
          case "Delivers": {
            if (!place.delivery) hasAmenities = false;
            break;
          }
          case "Outdoor Seating": {
            if (!place.outdoorSeating) hasAmenities = false;
            break;
          }
          default: {
            throw new Error("Unknown amenity submitted.");
          }
        }
      });

      return hasAmenities;
    });
  }

  return filteredLocations;
}