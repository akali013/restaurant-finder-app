"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import { Slider } from "@mui/material";


interface ChipData {
  key: number;
  label: string;
  selected: boolean;
};

export default function OtherFilters() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [placeChipData, setPlaceChipData] = useState(basePlaceTypeChipData);
  const [rating, setRating] = useState<number[]>([1, 5]);
  const [openingHours, setOpeningHours] = useState<number[]>([0, 23]);     // Military hours
  const [amenityChipData, setAmenityChipData] = useState(baseAmenityChipData);

  function removeSelectedPlaceTypeChip(data: ChipData) {
    setPlaceChipData(
      placeChipData.map(place => (place.key === data.key) ? { ...place, selected: false } : place)
    );
  }

  function addSelectedPlaceTypeChip(data: ChipData) {
    setPlaceChipData(
      placeChipData.map(place => (place.key === data.key) ? { ...place, selected: true } : place)
    );
  }

  function removeSelectedAmenityChip(data: ChipData) {
    setAmenityChipData(
      amenityChipData.map(amenity => (amenity.key === data.key) ? { ...amenity, selected: false } : amenity)
    );
  }

  function addSelectedAmenityChip(data: ChipData) {
    setAmenityChipData(
      amenityChipData.map(amenity => (amenity.key === data.key) ? { ...amenity, selected: true } : amenity)
    );
  }

  return (
    <>
      <button className="flex justify-center items-center bg-sky-200" onClick={() => { dialogRef.current?.showModal() }}>
        <Image
          src="/icons/filter.png"
          alt="Open other filters"
          width={30}
          height={30}
          className="mr-3"
        />
        <span className="text-lg">Other filters</span>
      </button>
      <dialog
        ref={dialogRef}
        closedby="any"
        className="absolute w-[90vw] h-[90vh] bg-mauve-200 p-5 left-15 right-15 top-5 bottom-5 backdrop:backdrop-blur-sm"
      >
        <h1 className="text-[64px] font-bold">Other Filters</h1>
        <button className="absolute top-10 right-10 p-3 rounded-full" onClick={() => { dialogRef.current?.close() }}>
          <Image
            src="/icons/close.png"
            alt="Close other filters"
            width={50}
            height={50}
          />
        </button>

        <h2 className="text-[32px]">Restaurant Type</h2>
        <div className="grid lg:grid-cols-5 sm:grid-cols-2 gap-3">
          {
            placeChipData.map((data: ChipData) =>
              data.selected ? (
                <Chip
                  key={data.key}
                  label={data.label}
                  onDelete={() => { removeSelectedPlaceTypeChip(data) }}
                  sx={{ bgcolor: "#7dd3fc", fontSize: "large" }}
                />
              ) : (
                <Chip
                  key={data.key}
                  label={data.label}
                  onClick={() => { addSelectedPlaceTypeChip(data) }}
                  sx={{ fontSize: "large" }}
                />
              )
            )
          }
        </div>

        <h2 className="text-[32px]">Rating</h2>
        <div className="w-[50%] mt-5 ml-5">
          <Slider
            value={rating}
            onChange={(event: Event, newRating: number[]) => { setRating(newRating) }}
            min={1}
            max={5}
            marks={[{ value: 1, label: "1 Star" }, { value: 2, label: "2 Stars" }, { value: 3, label: "3 Stars" }, { value: 4, label: "4 Stars" }, { value: 5, label: "5 Stars" }]}
          />
        </div>

        <h2 className="text-[32px]">Opening Hours (24hr format)</h2>
        <div className="w-[75%] mt-5 ml-5">
          <Slider
            value={openingHours}
            onChange={(event: Event, newOpeningHours: number[]) => { setOpeningHours(newOpeningHours) }}
            min={0}
            max={23}
            valueLabelDisplay="auto"
            marks={openingHourMarks}
          />
        </div>

        <h2 className="text-[32px]">Amenities</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-8 gap-3">
          {
            amenityChipData.map((data: ChipData) =>
              data.selected ? (
                <Chip
                  key={data.key}
                  label={data.label}
                  onDelete={() => { removeSelectedAmenityChip(data) }}
                  sx={{ bgcolor: "#7dd3fc", fontSize: "large" }}
                />
              ) : (
                <Chip
                  key={data.key}
                  label={data.label}
                  onClick={() => { addSelectedAmenityChip(data) }}
                  sx={{ fontSize: "large" }}
                />
              )
            )
          }
        </div>

        <div className="flex justify-end mt-15">
          <button className="bg-sky-200 text-[32px] px-20 py-5" onClick={() => { dialogRef.current?.close() }}>
            Apply
          </button>
        </div>
      </dialog>
    </>
  );
}

const basePlaceTypeChipData: ChipData[] = [
  { key: 1, label: "acai_shop", selected: false },
  { key: 2, label: "afghani_restaurant", selected: false },
  { key: 3, label: "african_restaurant", selected: false },
  { key: 4, label: "american_restaurant", selected: false },
  { key: 5, label: "argentinian_restaurant", selected: false },
  { key: 6, label: "asian_fusion_restaurant", selected: false },
  { key: 7, label: "asian_restaurant", selected: false },
  { key: 8, label: "australian_restaurant", selected: false },
  { key: 9, label: "austrian_restaurant", selected: false },
  { key: 10, label: "bagel_shop", selected: false },
  { key: 11, label: "bakery", selected: false },
  { key: 12, label: "bangladeshi_restaurant", selected: false },
  { key: 13, label: "bar", selected: false },
  { key: 14, label: "bar_and_grill", selected: false },
  { key: 15, label: "barbecue_restaurant", selected: false },
  { key: 16, label: "basque_restaurant", selected: false },
  { key: 17, label: "bavarian_restaurant", selected: false },
  { key: 18, label: "beer_garden", selected: false },
  { key: 19, label: "belgian_restaurant", selected: false },
  { key: 20, label: "bistro", selected: false },
  { key: 21, label: "brazilian_restaurant", selected: false },
  { key: 22, label: "breakfast_restaurant", selected: false },
  { key: 23, label: "brewery", selected: false },
  { key: 24, label: "brewpub", selected: false },
  { key: 25, label: "british_restaurant", selected: false },
  { key: 26, label: "brunch_restaurant", selected: false },
  { key: 27, label: "buffet_restaurant", selected: false },
  { key: 28, label: "burmese_restaurant", selected: false },
  { key: 29, label: "burrito_restaurant", selected: false },
  { key: 30, label: "cafe", selected: false },
  { key: 31, label: "cafeteria", selected: false },
  { key: 32, label: "cajun_restaurant", selected: false },
  { key: 33, label: "cake_shop", selected: false },
  { key: 34, label: "californian_restaurant", selected: false },
  { key: 35, label: "cambodian_restaurant", selected: false },
  { key: 36, label: "candy_store", selected: false },
  { key: 37, label: "cantonese_restaurant", selected: false },
  { key: 38, label: "caribbean_restaurant", selected: false },
  { key: 39, label: "cat_cafe", selected: false },
  { key: 40, label: "chicken_restaurant", selected: false },
  { key: 41, label: "chicken_wings_restaurant", selected: false },
  { key: 42, label: "chilean_restaurant", selected: false },
  { key: 43, label: "chinese_noodle_restaurant", selected: false },
  { key: 44, label: "chinese_restaurant", selected: false },
  { key: 45, label: "chocolate_factory", selected: false },
  { key: 46, label: "chocolate_shop", selected: false },
  { key: 47, label: "cocktail_bar", selected: false },
  { key: 48, label: "coffee_roastery", selected: false },
  { key: 49, label: "coffee_shop", selected: false },
  { key: 50, label: "coffee_stand", selected: false },
];

const openingHourMarks = [
  { value: 0, label: "12 AM" },
  { value: 1, label: "1 AM" },
  { value: 2, label: "2 AM" },
  { value: 3, label: "3 AM" },
  { value: 4, label: "4 AM" },
  { value: 5, label: "5 AM" },
  { value: 6, label: "6 AM" },
  { value: 7, label: "7 AM" },
  { value: 8, label: "8 AM" },
  { value: 9, label: "9 AM" },
  { value: 10, label: "10 AM" },
  { value: 11, label: "11 AM" },
  { value: 12, label: "12 PM" },
  { value: 13, label: "1 PM" },
  { value: 14, label: "2 PM" },
  { value: 15, label: "3 PM" },
  { value: 16, label: "4 PM" },
  { value: 17, label: "5 PM" },
  { value: 18, label: "6 PM" },
  { value: 19, label: "7 PM" },
  { value: 20, label: "8 PM" },
  { value: 21, label: "9 PM" },
  { value: 22, label: "10 PM" },
  { value: 23, label: "11 PM" }
];

const baseAmenityChipData = [
  { key: 0, label: "Accepts Card", selected: false },
  { key: 1, label: "Accepts Cash", selected: false },
  { key: 2, label: "Vegetarian", selected: false },
  { key: 3, label: "Takeout", selected: false },
  { key: 4, label: "Accessible", selected: false },
  { key: 5, label: "Delivers", selected: false },
  { key: 6, label: "Kids Menu", selected: false },
  { key: 7, label: "Outdoor Seating", selected: false }
];