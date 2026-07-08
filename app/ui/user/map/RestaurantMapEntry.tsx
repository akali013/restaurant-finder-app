import Image from "next/image"
import RestaurantDetails from "@/app/ui/user/map/RestaurantDetails";

export default function RestaurantMapEntry() {
  return (
    <div className="grid grid-cols-2 bg-mauve-100 lg:w-[34vw] p-2 relative">
      {/* Restaurant info */}
      <div className="flex flex-col items-start">
        <p className="text-4xl font-medium">Restaurant Name</p>
        <p className="text-2xl">Rating</p>
        <div className="flex justify-center">
          <p className="text-2xl mr-5">Type</p>
          <p className="text-2xl mr-5">Price</p>
          <p className="text-2xl">Open/Closed</p>
        </div>
        <p className="text-2xl">Address</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-start">
        {/* Group restaurant details button and dialog into one component to keep a ref in one component */}
        <RestaurantDetails />

        <button className="bg-sky-300 rounded-full">
          <Image
            src="/icons/save.png"
            alt="Save restaurant"
            width={40}
            height={40}
          />
        </button>
      </div>

      {/* Icons */}
      <div className="absolute bottom-0 right-0 grid grid-cols-2">
        <Image
          src="/icons/price.png"
          alt="This restaurant accepts cash."
          width={35}
          height={35}
        />
        <Image
          src="/icons/card.png"
          alt="This restaurant accepts credit cards."
          width={35}
          height={35}
        />
        <Image
          src="/icons/delivery.png"
          alt="This restaurant delivers."
          width={35}
          height={35}
        />
        <Image
          src="/icons/accessible.png"
          alt="This restaurant has accessible options."
          width={35}
          height={35}
        />
      </div>
    </div>
  );
}