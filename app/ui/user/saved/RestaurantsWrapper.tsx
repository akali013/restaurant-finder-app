"use client";

import { unsaveRestaurant } from "@/app/lib/actions";
import { GooglePlace } from "@/app/lib/data";
import useSavedRestaurants from "@/app/lib/hooks/useSavedRestaurants";
import NoSavedRestaurants from "./NoSavedRestaurants";
import SavedRestaurantList from "./SavedRestaurantList";

export default function RestaurantsWrapper() {
  const [savedRestaurants, setSavedRestaurants] = useSavedRestaurants("Saved");

  if (savedRestaurants.length === 0) return <NoSavedRestaurants />

  return (
    <div className="px-10">
      <h1 className="font-extrabold text-[80px] max-md:text-[35px] max-md:text-center">Saved Restaurants</h1>
      <SavedRestaurantList savedRestaurants={savedRestaurants} onRemove={removeSavedRestaurant} />
    </div>
  );

  // Removes the specified restaurant from the client and database
  async function removeSavedRestaurant(placeId: string) {
    let savedRestaurants = JSON.parse(localStorage.getItem("savedRestaurants") || "{}") as GooglePlace[];
    savedRestaurants = savedRestaurants.filter((place: GooglePlace) => place.id !== placeId);
    setSavedRestaurants(savedRestaurants);
    localStorage.setItem("savedRestaurants", JSON.stringify(savedRestaurants));
    await unsaveRestaurant(placeId);
  }
}


