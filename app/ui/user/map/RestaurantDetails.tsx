import { saveRestaurant } from "@/app/lib/actions";
import { GooglePlace } from "@/app/lib/data";
import { getFormattedPrice, getFormattedType } from "@/app/lib/placeFormatting";
import Image from "next/image";
import { useRef } from "react";

// A dialog that provides more info about a restaurant
export default function RestaurantDetails({ place }: { place: GooglePlace }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const currentDay = new Date().getDay();

  return (
    <>
      <button className="bg-sky-300 rounded-full mr-3 lg:p-3 max-md:mt-2" onClick={() => { dialogRef.current?.showModal() }}>
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
        className="absolute w-[90vw] h-[90vh] bg-mauve-200 p-5 lg:left-15 lg:right-15 max-md:left-10 max-md:-right-3 top-5 bottom-5 backdrop:backdrop-blur-sm text-[32px]"
      >
        <h1 className="font-bold text-[64px] max-md:text-[30px]">{place.displayName.text}</h1>
        <h2 className="capitalize max-md:text-[16px]">{getFormattedType(place)}</h2>
        <h2 className="max-md:text-[16px]">{place.formattedAddress}</h2>
        <h2 className="max-md:text-[16px]">Price Level: {getFormattedPrice(place)}</h2>
        <h2 className="max-md:text-[16px]">{place.rating} stars</h2>
        <h2 className="max-md:text-[16px] text-[36px] font-bold mt-15">Opening Hours</h2>
        {place.currentOpeningHours ? (
          <ul>{place.currentOpeningHours?.weekdayDescriptions?.map(day => (
            <li key={day} className="max-md:text-[16px]">
              {day}
            </li>
          ))}
          </ul>
        ) : (
          <p>N/A</p>
        )}
        <h2 className="font-bold text-[36px] mt-15 max-md:text-[16px]">Amenities</h2>
        <ul className="list-disc ml-10 max-md:text-[16px]">
          {place.paymentOptions?.acceptsCreditCards && <li>Accepts Card</li>}
          {place.paymentOptions?.acceptsCashOnly && <li>Accepts Cash Only</li>}
          {place.servesVegetarianFood && <li>Vegetarian Options</li>}
          {place.takeout && <li>Takeout</li>}
          {place.accessibilityOptions && <li>Accessible</li>}
          {place.delivery && <li>Delivery</li>}
          {place.outdoorSeating && <li>Outdoor Seating</li>}
        </ul>

        <div className="flex absolute lg:top-10 lg:right-10 max-md:bottom-3 max-md:left-10">
          <button className="bg-sky-200 rounded-full mr-10 lg:p-5" onClick={() => saveRestaurant(place.id)}>
            <Image
              src="/icons/save.png"
              alt="Save restaurant"
              width={40}
              height={40}
            />
          </button>

          <button className="bg-sky-200 rounded-full lg:p-5" onClick={() => { dialogRef.current?.close(); }}>
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