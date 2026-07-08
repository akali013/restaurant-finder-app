"use client";

import Image from "next/image";
import { useRef } from "react";

export default function RestaurantDetails() {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
        <h1 className="font-bold text-[64px]">Restaurant Name</h1>
        <p>Type</p>
        <p>Address</p>
        <p>Price Level</p>
        <p>Rating</p>
        <p>Opening Hours</p>

        <h2 className="font-bold text-[36px] mt-15">Amenities</h2>
        <ul className="list-disc ml-10">
          <li>Accepts Card</li>
          <li>Accepts Cash</li>
          <li>Vegetarian</li>
          <li>Takeout</li>
          <li>Accessible</li>
          <li>Delivers</li>
          <li>Kids Menu</li>
          <li>Outdoor Seating</li>
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