"use client";

import Image from "next/image";
import { GooglePlace } from "@/app/lib/data";
import { getFormattedType } from "@/app/lib/placeFormatting";
import { saveRestaurant, unsaveRestaurant } from "@/app/lib/actions";
import { useState } from "react";

export default function SavedRestaurantList({ savedRestaurants }: { savedRestaurants: GooglePlace[] }) {
  const [saved, setSaved] = useState(true);

  return (
    <ul>
      {savedRestaurants.map(place => (
        <li key={place.id}>
          <div className="bg-mauve-300 flex max-md:flex-col p-5 my-5 justify-between items-center">
            <div className="flex flex-col items-start">
              <h2 className="text-[40px] max-md:text-[30px] font-medium">{place.displayName.text}</h2>
              <div className="flex justify-start text-[32px] max-md:text-[25px]">
                <p className="mr-5 capitalize">{getFormattedType(place)}</p>
              </div>
              <div className="flex justify-start text-[32px] max-md:text-[25px]">
                <p>{place.formattedAddress}</p>
              </div>
            </div>

            {saved ? (
              <button className="bg-sky-200 lg:p-5 rounded-full" onClick={async () => { await unsaveRestaurant(place.id); setSaved(false); }}>
                <Image
                  src="/icons/unsave.png"
                  alt={`Unsave ${place.displayName.text}`}
                  width={40}
                  height={40}
                />
              </button>
            ) : (
              <button className="bg-sky-300 lg:p-5 rounded-full" onClick={async () => { await saveRestaurant(place.id); setSaved(true); }}>
                <Image
                  src="/icons/save.png"
                  alt={`Save ${place.displayName.text}`}
                  width={40}
                  height={40}
                />
              </button>
            )}

          </div>
        </li>
      ))}
    </ul>
  );
}