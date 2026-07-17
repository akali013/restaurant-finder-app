import { NearbySearchResponsePlace } from "@/app/lib/data";
import { getFormattedPrice, getFormattedType } from "@/app/lib/placeFormatting";
import Image from "next/image";
import { useRef } from "react";

// A dialog that provides more info about a restaurant
export default function RestaurantDetails({ place }: { place: NearbySearchResponsePlace }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentDay = new Date().getDay();

  return (
    <>
      <button className="bg-sky-300 rounded-full mr-3" onClick={() => { dialogRef.current?.showModal() }}>
        <Image
          src="/icons/view.png"
          alt="Inspect restaurant details"
          width={40}
          height={40}
        />
      </button>

      <dialog
        ref={dialogRef}
        closedby="any"
        className="absolute w-[90vw] h-[90vh] bg-mauve-200 p-5 left-15 right-15 top-5 bottom-5 backdrop:backdrop-blur-sm text-[32px]"
      >
        <h1 className="font-bold text-[64px]">{place.displayName.text}</h1>
        <h2 className="capitalize">{getFormattedType(place)}</h2>
        <h2>{place.formattedAddress}</h2>
        <h2>Price Level: {getFormattedPrice(place)}</h2>
        <h2>{place.rating}</h2>
        <h2>Opening Hours</h2>
        {place.currentOpeningHours ? (
          <ul>{place.currentOpeningHours?.weekdayDescriptions.map(day => (
            <li key={day}>
              {day}
            </li>
          ))}
          </ul>
        ) : (
          <p>N/A</p>
        )}
        <h2 className="font-bold text-[36px] mt-15">Amenities</h2>
        <ul className="list-disc ml-10">
          {place.paymentOptions?.acceptsCreditCards && <li>Accepts Card</li>}
          {place.paymentOptions?.acceptsCashOnly && <li>Accepts Cash Only</li>}
          {place.servesVegetarianFood && <li>Vegetarian Options</li>}
          {place.takeout && <li>Takeout</li>}
          {place.accessibilityOptions && <li>Accessible</li>}
          {place.delivery && <li>Delivery</li>}
          {place.outdoorSeating && <li>Outdoor Seating</li>}
        </ul>

        <div className="flex absolute top-10 right-10">
          <button className="bg-sky-200 rounded-full mr-10 p-5">
            <Image
              src="/icons/save.png"
              alt="Save restaurant"
              width={40}
              height={40}
            />
          </button>

          <button className="bg-sky-200 rounded-full p-5" onClick={() => { dialogRef.current?.close(); }}>
            <Image
              src="/icons/close.png"
              alt="Close restaurant details"
              width={40}
              height={40}
            />
          </button>
        </div>
      </dialog>
    </>
  );
}