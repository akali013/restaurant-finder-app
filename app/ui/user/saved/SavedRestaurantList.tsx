import { GooglePlace } from "@/app/lib/data";
import SavedRestaurantItem from "./SavedRestaurantItem";

export default function SavedRestaurantList({ savedRestaurants }: { savedRestaurants: GooglePlace[] }) {
  return (
    <ul>
      {savedRestaurants.map(place => (
        <SavedRestaurantItem key={place.id} place={place} />
      ))}
    </ul>
  );
}