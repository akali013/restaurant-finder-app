"use client";

import { useState, useEffect } from "react";
import { GooglePlace, ListFilterType, MapsAPIResponse, PlaceType } from "@/app/lib/data";
import { convertMilesToMeters } from "../placeFormatting";

// The API can do the filtering work with userLocation, miles, and primaryTypes. 
export default function useNearbySearch(
  userLocation: { lat: number, lng: number },
  listType: ListFilterType,
  miles?: number,
  primaryTypes?: PlaceType[],
) {
  const [locations, setLocations] = useState<GooglePlace[]>([]);

  // Provide default values for values not passed in
  const radius = convertMilesToMeters(miles || 10);
  const placeTypes = primaryTypes?.length! > 0 ? primaryTypes?.map(type => type.name) : ["restaurant"];
  const searchURL = `/api/nearbySearch?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}&primaryTypes=${placeTypes}`;

  // Get nearby restaurants
  useEffect(() => {
    let ignore = false;
    async function searchNearbyRestaurants() {
      const response = await fetch(searchURL);
      const data = await response.json() as MapsAPIResponse;
      console.log(data);
      setLocations(data.places);
    }

    if (userLocation.lat === 0 && userLocation.lng === 0) return;   // Do not make requests until the user's location is found
    if (!ignore || listType !== "All") searchNearbyRestaurants();   // Only make calls to the API when the list type is "All"

    return () => {
      ignore = true;
    };
  }, [userLocation, searchURL, listType]);

  return locations;
}

