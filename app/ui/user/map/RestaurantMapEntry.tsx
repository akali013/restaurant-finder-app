"use client";

import Image from "next/image"
import RestaurantDetails from "@/app/ui/user/map/RestaurantDetails";
import { NearbySearchResponsePlace } from "@/app/lib/data";
import { useMap } from "@vis.gl/react-google-maps";
import { getFormattedPrice, getFormattedType } from "@/app/lib/placeFormatting";
import { saveRestaurant } from "@/app/lib/actions";

export default function RestaurantMapEntry({ place }: { place: NearbySearchResponsePlace }) {
  const map = useMap();

  return (
    <div className="grid grid-cols-2 bg-mauve-100 lg:w-[34vw] p-2 relative border-b-sky-400 border-b-3">
      {/* Restaurant info */}
      <div className="flex flex-col items-start">
        <p className="text-4xl font-medium">{place.displayName.text}</p>
        <p className="text-2xl">{place.rating}</p>
        <div className="flex justify-center">
          <p className="text-2xl mr-5 capitalize text-nowrap">{getFormattedType(place)}</p>
          <p className="text-2xl mr-5 text-nowrap">Price: {getFormattedPrice(place)}</p>
          {place.currentOpeningHours && <p className="text-2xl text-nowrap">{place.currentOpeningHours?.openNow ? "Open" : "Closed"}</p>}
        </div>
        <p className="text-2xl">{place.formattedAddress}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-start pr-6">
        <button
          className="bg-sky-300 rounded-full mr-4"
          onClick={() => {
            map?.setCenter({ lat: place.location.latitude, lng: place.location.longitude });
          }}
        >
          <Image
            src="/icons/pin.png"
            alt="Show restaurant on map"
            width={40}
            height={40}
          />
        </button>

        {/* Group restaurant details button and dialog into one component to keep a ref in one component */}
        <RestaurantDetails place={place} />

        <button className="bg-sky-300 rounded-full" onClick={() => { saveRestaurant(place.id) }}>
          <Image
            src="/icons/save.png"
            alt="Save restaurant"
            width={40}
            height={40}
          />
        </button>
      </div>

      {/* Icons */}
      <div className="absolute bottom-0 right-6 grid grid-cols-2">
        {
          place.paymentOptions?.acceptsCashOnly &&
          <Image
            src="/icons/price.png"
            alt="This restaurant accepts cash only."
            width={35}
            height={35}
          />
        }
        {
          place.paymentOptions?.acceptsCreditCards &&
          <Image
            src="/icons/card.png"
            alt="This restaurant accepts credit cards."
            width={35}
            height={35}
          />
        }
        {
          place.delivery &&
          <Image
            src="/icons/delivery.png"
            alt="This restaurant delivers."
            width={35}
            height={35}
          />
        }
        {
          place.accessibilityOptions &&
          <Image
            src="/icons/accessible.png"
            alt="This restaurant has accessible options."
            width={35}
            height={35}
          />
        }
      </div>
    </div>
  );
}