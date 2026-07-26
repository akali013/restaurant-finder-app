import Image from "next/image";
import { GooglePlace } from "@/app/lib/data";
import { getFormattedType } from "@/app/lib/placeFormatting";

export default function SavedRestaurantList({ savedRestaurants, onRemove }: { savedRestaurants: GooglePlace[], onRemove: (placeId: string) => Promise<void> }) {
  return (
    <ul>
      {savedRestaurants.map(place => (
        <li key={place.id}>
          <div className="bg-mauve-300 flex p-5 my-5 justify-between items-center">
            <div className=" flex flex-col items-start">
              <h2 className="text-[40px] font-medium">{place.displayName.text}</h2>
              <div className="flex justify-start text-[32px]">
                <p className="mr-5 capitalize">{getFormattedType(place)}</p>
                <p>{place.formattedAddress}</p>
              </div>
            </div>

            <button className="bg-sky-200 p-5 rounded-full" onClick={async () => { await onRemove(place.id) }}>
              <Image
                src="/icons/unsave.png"
                alt={`Unsave ${place.displayName.text}`}
                width={40}
                height={40}
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}