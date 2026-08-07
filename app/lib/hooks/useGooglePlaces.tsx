"use client";

import { useState, useEffect } from "react";
import { GooglePlace, ListFilterType, MapsAPIResponse, PlaceType } from "@/app/lib/data";
import { convertMilesToMeters } from "../placeFormatting";

// The API can do the filtering work with userLocation, miles, and primaryTypes. 
export default function useGooglePlaces(
  userLocation: { lat: number, lng: number },
  listType: ListFilterType,
  miles?: number,
  primaryTypes?: PlaceType[],
  query?: string
) {
  const [locations, setLocations] = useState<GooglePlace[]>([]);
  // Provide default values for values not passed in
  const radius = convertMilesToMeters(miles || 10);

  useEffect(() => {
    const placeTypes = primaryTypes?.length! > 0 ? primaryTypes?.map(type => type.name) : ["restaurant"];
    let ignore = false;     // Prevents race conditions and uses only the latest data

    // Get restaurants from the Nearby Search API
    async function searchNearbyRestaurants() {
      if (!ignore) {
        const response = await fetch(`/api/nearbySearch?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}&primaryTypes=${placeTypes}`);
        const data = await response.json() as MapsAPIResponse;
        console.log(data);
        setLocations(data.places);
      }
    }

    // Get restaurants from the Text Search API
    async function getTextSearchRestaurants() {
      if (!ignore) {
        const response = await fetch(`/api/textSearch?query=${query}&lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`);
        const data = await response.json() as MapsAPIResponse;
        console.log(data);
        setLocations(data.places);
      }
    }

    // Do not make requests until the user's location is found
    // and only make calls to the API when the list type is "All" or "Recommended."
    // Then call the Text Search API or the Nearby Search API based on if a user passes a query
    if (userLocation.lat !== 0 && userLocation.lng !== 0 && (listType === "All" || listType === "Recommended")) {
      query ? getTextSearchRestaurants() : searchNearbyRestaurants();
    }

    return () => {
      ignore = true;
    };
  }, [userLocation, radius, primaryTypes, listType, query]);

  return locations;
}

