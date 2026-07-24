import Image from "next/image";

// Icon and a message that shows when no places are found for the applied filters
export default function NoPlacesFound({ filtersActive }: { filtersActive: boolean }) {
  return (
    <div className="w-full h-full bg-mauve-100 flex flex-col items-center justify-center">
      <Image
        src="/icons/no_places.png"
        alt="No places found!"
        width={50}
        height={50}
      />
      <h1 className="text-3xl">No places found!</h1>
      {filtersActive && <p>Try changing or clearing your filters.</p>}
    </div>
  );
}