import { GooglePriceLevel } from "@/app/lib/data";

// Displays buttons for each price level from the Google Maps API
export default function PriceFilterTab(
  { onClick, priceLevel }:
    { onClick: (priceLevel: GooglePriceLevel) => void, priceLevel: GooglePriceLevel | "" }
) {
  return (
    <div className="flex justify-center items-center py-5">
      <button className={`${priceLevel === "PRICE_LEVEL_INEXPENSIVE" ? "bg-sky-400" : "bg-sky-200"} text-[16px] mr-3`} onClick={() => onClick("PRICE_LEVEL_INEXPENSIVE")}>
        Low
      </button>
      <button className={`${priceLevel === "PRICE_LEVEL_MODERATE" ? "bg-sky-400" : "bg-sky-200"} text-[16px] mr-3`} onClick={() => onClick("PRICE_LEVEL_MODERATE")}>
        Medium
      </button>
      <button className={`${priceLevel === "PRICE_LEVEL_EXPENSIVE" ? "bg-sky-400" : "bg-sky-200"} text-[16px] mr-3`} onClick={() => onClick("PRICE_LEVEL_EXPENSIVE")}>
        Expensive
      </button>
      <button className={`${priceLevel === "PRICE_LEVEL_VERY_EXPENSIVE" ? "bg-sky-400" : "bg-sky-200"} text-[16px] text-nowrap mr-3`} onClick={() => onClick("PRICE_LEVEL_VERY_EXPENSIVE")}>
        Very Expensive
      </button>
      <button className={`${priceLevel === "PRICE_LEVEL_UNSPECIFIED" ? "bg-sky-400" : "bg-sky-200"} text-[16px] text-nowrap`} onClick={() => onClick("PRICE_LEVEL_UNSPECIFIED")}>
        Unknown
      </button>
    </div>
  );
}