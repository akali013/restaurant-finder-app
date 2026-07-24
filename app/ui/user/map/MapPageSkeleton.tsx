import Image from "next/image";


// Loading page for the map page
export default function MapPageSkeleton() {
  return (
    <div className="flex bg-mauve-300 h-screen">
      <div className="flex flex-col max-h-screen overflow-y-auto overflow-x-hidden scrollbar-none">
        <EmptyRestaurantEntry />
      </div>
      <div className="flex items-center justify-center pl-70">
        <Image
          src="/icons/loading.png"
          alt="Loading map..."
          width={35}
          height={35}
          className="animate-spin"
        />
        <p>Loading map...</p>
      </div>
    </div>
  );
}

function EmptyRestaurantEntry() {
  return (
    <div className="grid grid-cols-2 bg-mauve-100 lg:w-[34vw] p-2 relative border-b-sky-400 border-b-3">
      <div className="flex flex-col items-start p-5" />

      {/* Buttons */}
      <div className="flex justify-end items-start pr-6">
        <button className="bg-sky-300 rounded-full mr-4 pointer-events-none" />

        <button className="bg-sky-300 rounded-full pointer-events-none" />
      </div>
    </div>
  );
}