// Displays buttons for each price level from the Google Maps API
export default function PriceFilterTab({ onClick }: { onClick: (priceLevel: "" | "Low" | "Medium" | "Expensive" | "Very Expensive" | "Unspecified") => void }) {
  return (
    <div className="flex justify-center items-center py-5">
      <button className={`bg-sky-200 text-[16px] mr-3`} onClick={() => onClick("Low")}>
        Low
      </button>
      <button className="bg-sky-200 text-[16px] mr-3" onClick={() => onClick("Medium")}>
        Medium
      </button>
      <button className="bg-sky-200 text-[16px] mr-3" onClick={() => onClick("Expensive")}>
        Expensive
      </button>
      <button className="bg-sky-200 text-[16px] text-nowrap mr-3" onClick={() => onClick("Very Expensive")}>
        Very Expensive
      </button>
      <button className="bg-sky-200 text-[16px] text-nowrap" onClick={() => onClick("Unspecified")}>
        Unknown
      </button>
    </div>
  );
}