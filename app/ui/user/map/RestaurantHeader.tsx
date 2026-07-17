import Image from "next/image";
import PriceFilterTab from "@/app/ui/user/map/PriceFilterTab";
import DistanceFilterTab from "./DistanceFilterTab";
import OtherFilters from "@/app/ui/user/map/OtherFilters";
import { MouseEventHandler, useState } from "react";
import { OtherFiltersType, PlaceType } from "@/app/lib/data";
import RestaurantSearchBar from "./RestaurantSearchBar";

export default function RestaurantHeader(
  { miles, onMilesChange, onPriceFilter, onOtherFilters, filtersActive, onClearFilters }:
    {
      miles: number,
      onMilesChange: (miles: number) => void,
      onPriceFilter: (priceLevel: "" | "Low" | "Medium" | "Expensive" | "Very Expensive" | "Unspecified") => void,
      onOtherFilters: (placeTypes: PlaceType[], otherFilters: OtherFiltersType) => void,
      filtersActive: boolean,
      onClearFilters: MouseEventHandler<HTMLButtonElement>
    }) {
  // Current filter being selected
  const [currentFilter, setCurrentFilter] = useState<"" | "Distance" | "Price">("");

  return (
    <div className="flex flex-col items-center bg-mauve-300 lg:w-[34vw] lg:pr-5">
      {/* Restaurant option buttons */}
      <div className="flex justify-center mt-2">
        <button className="bg-sky-200 sm:text-[15px] lg:text-[24px] mr-5">
          All Restaurants
        </button>
        <button className="bg-sky-200 sm:text-[15px] lg:text-[24px] mr-5">
          Saved
        </button>
        <button className="bg-sky-200 sm:text-[15px] lg:text-[24px]">
          Recommended
        </button>
      </div>

      {/* Search bar and clear filters button */}
      <div className="flex mt-5 justify-center items-center px-3">
        <RestaurantSearchBar />

        {filtersActive &&
          <button 
            className="bg-rose-300 text-[20px] text-nowrap ml-5 flex justify-center items-center"
            onClick={onClearFilters}
          >
            <Image
              src="/icons/delete.png"
              alt="Clear all filters"
              width={30}
              height={30}
            />
            <span>Clear Filters</span>
          </button>
        }
      </div>

      {/* Filter buttons */}
      <div className="flex justify-center mt-5 mb-2 relative">
        <button
          className="flex justify-center items-center bg-sky-200 mr-5"
          onClick={() => currentFilter === "Distance" ? setCurrentFilter("") : setCurrentFilter("Distance")}
        >
          <Image
            src="/icons/distance.png"
            alt="Filter by distance"
            width={30}
            height={30}
            className="mr-3"
          />
          <span className="text-lg text-nowrap">Filter by distance</span>
        </button>
        <button
          className="flex justify-center items-center bg-sky-200 mr-5"
          onClick={() => currentFilter === "Price" ? setCurrentFilter("") : setCurrentFilter("Price")}>
          <Image
            src="/icons/price.png"
            alt="Filter by price"
            width={30}
            height={30}
            className="mr-3"
          />
          <span className="text-lg text-nowrap">Filter by price</span>
        </button>
        {/* Group other filters button and dialog into one component to keep a ref in one component */}
        <OtherFilters onApply={onOtherFilters} />

        <div className="absolute left-0 right-0 -bottom-20 z-1 bg-mauve-400">
          {currentFilter === "Price" && <PriceFilterTab onClick={(priceLevel: "" | "Low" | "Medium" | "Expensive" | "Very Expensive" | "Unspecified") => {
            onPriceFilter(priceLevel);
            setCurrentFilter("");
          }} />}
          {currentFilter === "Distance" &&
            <DistanceFilterTab
              miles={miles}
              onMilesChange={onMilesChange}
              onClick={() => {
                setCurrentFilter("");
              }}
            />}
        </div>
      </div>
    </div>
  );
}

