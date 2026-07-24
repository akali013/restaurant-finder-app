"use client";

import { useEffect, useState } from "react";

// Updates the search parameters with the user's location
export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

  // Get the user's location with geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
        () => {
          console.error("Location denied.");
        }
      );
    }
    else {
      console.error("Browser does not support geolocation.");
    }
  }, []);

  return userLocation;
}