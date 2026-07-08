export default function PriceFilterTab() {
  return (
    <div className="flex justify-center items-center p-2 py-5">
      <button className="bg-sky-200 text-xl mr-3">
        Low
      </button>
      <button className="bg-sky-200 text-xl mr-3">
        Medium
      </button>
      <button className="bg-sky-200 text-xl mr-3">
        High
      </button>
      <button className="bg-sky-200 text-xl mr-3">
        Expensive
      </button>
      <button className="bg-sky-200 text-xl text-nowrap">
        Very Expensive
      </button>
    </div>
  );
}