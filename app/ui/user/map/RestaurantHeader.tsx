"use client";

import Image from "next/image";
import PriceFilterTab from "@/app/ui/user/map/PriceFilterTab";
import DistanceFilterTab from "./DistanceFilterTab";
import OtherFilters from "@/app/ui/user/map/OtherFilters";
import { useState } from "react";
import { GooglePriceLevel, ListFilterType } from "@/app/lib/data";
import RestaurantSearchBar from "./RestaurantSearchBar";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function RestaurantHeader({ filtersActive }: { filtersActive: boolean }) {
  // Current filter being selected
  const [currentFilter, setCurrentFilter] = useState<"" | "Distance" | "Price">("");
  const searchParams = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();

  const listType = searchParams.get("listType") as ListFilterType;
  const miles = Number(searchParams.get("miles")) || 0;
  const priceLevel = searchParams.get("priceLevel") as GooglePriceLevel || "";

  // Clear filters by removing all filter search parameters
  function clearFilters() {
    searchParams.delete("miles");
    searchParams.delete("placeTypes");
    searchParams.delete("priceLevel");
    searchParams.delete("otherFilters");

    replace(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <div className="flex flex-col items-center bg-mauve-300 w-full">
      {/* Restaurant option buttons */}
      <div className="flex justify-center mt-2">
        <button className={`${listType === "All" ? "bg-sky-400" : "bg-sky-200"} text-[18px] lg:text-[20px] max-md:text-[12px] lg:mr-5`} onClick={() => {
          searchParams.set("listType", "All");
          searchParams.delete("query");
          replace(`${pathname}?${searchParams.toString()}`);
        }}>
          All
        </button>
        <button className={`${listType === "Saved" ? "bg-sky-400" : "bg-sky-200"} text-[18px] lg:text-[20px] max-md:text-[12px] lg:mr-5`} onClick={() => {
          searchParams.set("listType", "Saved");
          searchParams.delete("query");
          replace(`${pathname}?${searchParams.toString()}`);
        }}>
          Saved
        </button>
        <button className={`${listType === "Recommended" ? "bg-sky-400" : "bg-sky-200"} text-[18px] lg:text-[20px] max-md:text-[12px]`} onClick={() => {
          searchParams.set("listType", "Recommended");
          searchParams.delete("query");
          replace(`${pathname}?${searchParams.toString()}`);
        }}>
          Recommended
        </button>
      </div>

      {/* Search bar and clear filters button */}
      <div className="flex mt-5 justify-center items-center px-3">
        <RestaurantSearchBar />

        {filtersActive &&
          <button
            className="bg-rose-300 text-nowrap ml-5 flex justify-center items-center text-[15px] lg:text-[20px]"
            onClick={clearFilters}
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
          className={`${miles !== 0 ? "bg-sky-400" : "bg-sky-200"} flex justify-between items-center mr-2 lg:mr-5`}
          onClick={() => currentFilter === "Distance" ? setCurrentFilter("") : setCurrentFilter("Distance")}
        >
          <Image
            src="/icons/distance.png"
            alt="Filter by distance"
            width={30}
            height={30}
          />
          <span className="max-sm:hidden text-[16px] lg:text-[18px]">Filter distance</span>
        </button>
        <button
          className={`${priceLevel ? "bg-sky-400" : "bg-sky-200"} flex justify-between items-center mr-2 lg:mr-5`}
          onClick={() => currentFilter === "Price" ? setCurrentFilter("") : setCurrentFilter("Price")}>
          <Image
            src="/icons/price.png"
            alt="Filter by price"
            width={30}
            height={30}
          />
          <span className="max-sm:hidden text-[16px] lg:text-[18px]">Filter price</span>
        </button>
        {/* Group other filters button and dialog into one component to keep a ref in one component */}
        <OtherFilters />

        <div className="absolute max-md:-left-10 max-md:-right-10 lg:left-0 lg:right-0 -bottom-20 z-1 bg-mauve-400">
          {currentFilter === "Price" &&
            <PriceFilterTab
              onClick={(priceLevel: GooglePriceLevel) => {
                searchParams.set("priceLevel", priceLevel);
                setCurrentFilter("");
                replace(`${pathname}?${searchParams.toString()}`);
              }}
              priceLevel={priceLevel}
            />}

          {currentFilter === "Distance" &&
            <DistanceFilterTab onClick={() => setCurrentFilter("")} />}
        </div>
      </div>
    </div>
  );
}

