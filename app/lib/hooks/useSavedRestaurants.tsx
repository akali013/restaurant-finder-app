import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GooglePlace, ListFilterType } from "../data";
import { getSavedRestaurantIds } from "../actions";

// Gets the Google Place data of each saved restaurant from the postgres db using its restaurantid
export default function useSavedRestaurants(listType: ListFilterType): [GooglePlace[], Dispatch<SetStateAction<GooglePlace[]>>] {
  const [savedRestaurants, setSavedRestaurants] = useState<GooglePlace[]>([]);

  useEffect(() => {
    let ignore = false;

    async function getSavedRestaurantDetails() {
      // Avoid querying the API by saving data in localStorage
      const localSavedRestaurants = JSON.parse(localStorage.getItem("savedRestaurants") || "{}") || [];

      if (localSavedRestaurants.length > 0) {
        setSavedRestaurants(localSavedRestaurants);
      } else {
        const savedIds = await getSavedRestaurantIds();
        console.log(savedIds);

        const placeDetails: GooglePlace[] = await Promise.all(
          savedIds.map<Promise<GooglePlace>>(async (restaurant) => {
            const response = await fetch(`/api/placeDetails?placeId=${restaurant.restaurantid}`);
            const data = await response.json() as GooglePlace;
            return data;
          })
        );

        localStorage.setItem("savedRestaurants", JSON.stringify(placeDetails));
        setSavedRestaurants(placeDetails);
      }
    }

    if (!ignore && listType === "Saved") getSavedRestaurantDetails(); // Only make calls to the API if the list type is "Saved"

    return () => {
      ignore = true;
    }
  }, [listType]);

  return [savedRestaurants, setSavedRestaurants];
}