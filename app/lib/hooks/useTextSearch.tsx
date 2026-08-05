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

  useEffect(() => {
    let ignore = false;

    async function getRestaurants() {
      if (!ignore) {
        const response = await fetch(`/api/textSearch?query=${query}&lat=${userLocation.lat}&lng=${userLocation.lng}&radius=${radius}`);
        const data = await response.json() as MapsAPIResponse;
        console.log(data);
        setLocations(data.places);
      }
    }

    // Do not make requests until the user's location is found
    // Only make API requests when the list type is "All"
    if (userLocation.lat !== 0 && userLocation.lng !== 0 && listType === "All") getRestaurants();

    return () => {
      ignore = true;
    }
  }, [userLocation, listType, radius, query]);

  return locations;
}