import Image from "next/image";
import PriceFilterTab from "@/app/ui/user/map/PriceFilterTab";
import DistanceFilterTab from "./DistanceFilterTab";
import OtherFilters from "@/app/ui/user/map/OtherFilters";


export default function RestaurantHeader() {
  return (
    <div className="flex flex-col items-center bg-mauve-300 lg:w-[34vw]">
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

      {/* Search bar */}
      <div className="flex mt-5">
        <div className="flex items-center bg-mauve-200 rounded-4xl py-2 w-full">
          <input
            className="bg-transparent rounded-4xl focus:outline-2 text-2xl w-full py-2 px-10"
            placeholder="Search restaurants..."
          />
          <button className="bg-transparent">
            <Image
              src="/icons/search.png"
              alt="Search for restaurants"
              width={45}
              height={45}
            />
          </button>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex justify-center mt-5 mb-2">
        <button className="flex justify-center items-center bg-sky-200 mr-5">
          <Image
            src="/icons/distance.png"
            alt="Filter by distance"
            width={30}
            height={30}
            className="mr-3"
          />
          <span className="text-lg">Filter by distance</span>
        </button>
        <button className="flex justify-center items-center bg-sky-200 mr-5">
          <Image
            src="/icons/price.png"
            alt="Filter by price"
            width={30}
            height={30}
            className="mr-3"
          />
          <span className="text-lg">Filter by price</span>
        </button>
        {/* Group other filters button and dialog into one component to keep a ref in one component */}
        <OtherFilters />
      </div>

      <div className="absolute left-0 right-0 -bottom-20 z-1 bg-mauve-400">
        {/* <PriceFilterTab /> */}
        {/* <DistanceFilterTab /> */}
      </div>

    </div>
  );
}

