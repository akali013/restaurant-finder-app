"use client";

import { useEffect, useState } from "react";
import { GooglePlace, ListFilterType, MapsAPIResponse } from "../data";
import { convertMilesToMeters } from "../placeFormatting";

export function useTextSearch(
  query: string,
  userLocation: { lat: number, lng: number },
  listType: ListFilterType,
  miles?: number,
) {
  const [locations, setLocations] = useState<GooglePlace[]>([]);

  const radius = convertMilesToMeters(miles || 10);
  const searchURL = `/api/textSearch?query=${query}&lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`;

  useEffect(() => {
    let ignore = false;

    async function getRestaurants() {
      const response = await fetch(searchURL);
      const data = await response.json() as MapsAPIResponse;
      console.log(data);
      setLocations(data.places);
    }

    if (userLocation.lat === 0 && userLocation.lng === 0) return;   // Do not make requests until the user's location is found
    if (!ignore || listType === "All") getRestaurants();    // Only make API requests when the list type is "All"

    return () => {
      ignore = true;
    }
  }, [searchURL, userLocation, listType]);

  return locations;
}