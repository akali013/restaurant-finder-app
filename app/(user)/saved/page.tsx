import RestaurantsWrapper from "@/app/ui/user/saved/RestaurantsWrapper";
import { Metadata } from "next";

export default function SavedRestaurantsPage() {
  return <RestaurantsWrapper />;
}

export const metadata: Metadata = {
  title: "Saved Restaurants"
};