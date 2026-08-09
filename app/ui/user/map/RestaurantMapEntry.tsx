import Image from "next/image";
import RestaurantDetails from "@/app/ui/user/map/RestaurantDetails";
import { GooglePlace } from "@/app/lib/data";
import { useMap } from "@vis.gl/react-google-maps";
import { getFormattedPrice, getFormattedType } from "@/app/lib/placeFormatting";
import { saveRestaurant, unsaveRestaurant } from "@/app/lib/actions";
import { Dispatch, SetStateAction } from "react";

export default function RestaurantMapEntry({ place, savedRestaurants, setSavedRestaurants }: { place: GooglePlace, savedRestaurants: GooglePlace[], setSavedRestaurants: Dispatch<SetStateAction<GooglePlace[]>> }) {
  const map = useMap();

  return (
    <div className="lg:grid lg:grid-cols-2 bg-mauve-100 lg:w-[34vw] p-2 relative border-b-sky-400 border-b-3">
      {/* Restaurant info */}
      <div className="flex flex-col items-start">
        <p className="text-4xl font-medium max-md:text-xl">{place.displayName.text}</p>
        <p className="text-2xl max-md:text-[14px]">{place.rating} stars</p>
        <div className="flex justify-center">
          <p className="text-2xl max-md:text-[14px] mr-5 capitalize text-nowrap">{getFormattedType(place)}</p>
          <p className="text-2xl max-md:text-[14px] mr-5 text-nowrap">Price: {getFormattedPrice(place)}</p>
        </div>
        {place.currentOpeningHours &&
          <p className={`${place.currentOpeningHours?.openNow ? "text-sky-600" : "text-rose-600"} text-2xl max-md:text-[14px] text-nowrap`}>
            {place.currentOpeningHours?.openNow ? "Open" : "Closed"}
          </p>
        }
        <p className="text-2xl max-md:text-[14px]">{place.formattedAddress}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-start pr-3">
        <button
          className="bg-sky-300 rounded-full mr-3 lg:p-3 max-md:mt-2"
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

        {/* Show the option to save or unsave a restaurant depending on if it's already saved */}
        {savedRestaurants.map(restaurant => restaurant.id).includes(place.id) ? (
          <button className="bg-sky-500 rounded-full lg:p-3 max-md:mt-2" onClick={async () => { await removeSavedRestaurant(place.id) }}>
            <Image
              src="/icons/unsave.png"
              alt="Unsave restaurant"
              width={40}
              height={40}
            />
          </button>
        ) : (
          <button className="bg-sky-300 rounded-full lg:p-3 max-md:mt-2" onClick={async () => { await addSavedRestaurant(place.id) }}>
            <Image
              src="/icons/save.png"
              alt="Save restaurant"
              width={40}
              height={40}
            />
          </button>
        )}
      </div>

      {/* Icons */}
      <div className="absolute bottom-0 right-6 grid grid-cols-2 max-md:hidden">
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

  // Saves the specified restaurant in the client and database
  async function addSavedRestaurant(placeId: string) {
    await saveRestaurant(placeId);
    const response = await fetch(`/api/placeDetails?placeId=${placeId}`);
    const savedRestaurant = await response.json() as GooglePlace;

    let savedRestaurants = JSON.parse(localStorage.getItem("savedRestaurants") || "{}") as GooglePlace[];
    savedRestaurants.push(savedRestaurant!);
    localStorage.setItem("savedRestaurants", JSON.stringify(savedRestaurants));
    setSavedRestaurants(savedRestaurants);
  }

  // Removes the specified restaurant from the client and database
  async function removeSavedRestaurant(placeId: string) {
    let savedRestaurants = JSON.parse(localStorage.getItem("savedRestaurants") || "{}") as GooglePlace[];
    savedRestaurants = savedRestaurants.filter((place: GooglePlace) => place.id !== placeId);
    localStorage.setItem("savedRestaurants", JSON.stringify(savedRestaurants));
    await unsaveRestaurant(placeId);
    setSavedRestaurants(savedRestaurants);
  }
}

