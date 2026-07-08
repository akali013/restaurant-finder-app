import RestaurantHeader from "@/app/ui/user/map/RestaurantHeader";
import RestaurantMapEntry from "@/app/ui/user/map/RestaurantMapEntry";

export default function MapPage() {
  return (
    <div className="grid grid-cols-2">
      <RestaurantHeader />
      Map
      <RestaurantMapEntry />
    </div>
  );
}