import { getSavedRestaurantIds, unsaveRestaurant } from "@/app/lib/actions";
import NoSavedRestaurants from "./NoSavedRestaurants";
import SavedRestaurantList from "./SavedRestaurantList";
import { getSavedRestaurants } from "@/app/lib/data";

export default async function RestaurantsWrapper() {
  const savedRestaurantIds = await getSavedRestaurantIds();
  if (savedRestaurantIds.length === 0) return <NoSavedRestaurants />
  const savedRestaurants = (await getSavedRestaurants(savedRestaurantIds.map(obj => obj.restaurantid))).places;


  return (
    <div className="px-10">
      <h1 className="font-extrabold text-[80px] max-md:text-[35px] max-md:text-center">Saved Restaurants</h1>
      <SavedRestaurantList savedRestaurants={savedRestaurants} />
    </div>
  );
}


