"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import { Slider } from "@mui/material";
import { ChipData, openingHourMarks, OtherFiltersType, PlaceType } from "@/app/lib/data";
import { usePlaceTypes } from "@/app/lib/hooks/usePlaceTypes";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { formatChipLabel } from "@/app/lib/placeFormatting";

export default function OtherFilters() {
  const dialogRef = useRef<HTMLDialogElement>(null);    // References the dialog so it can be opened and closed with browser methods
  const [placeChipData, setPlaceChipData] = useState<ChipData[]>([]);
  const [rating, setRating] = useState<number[]>([1, 5]);
  const [openingHours, setOpeningHours] = useState<number[]>([0, 23]);     // Military hours
  const [amenityChipData, setAmenityChipData] = useState(baseAmenityChipData);
  const searchParams = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();

  usePlaceTypes(setPlaceChipData);    // Get place types from postgres db

  // Handles selecting and unselecting chips for the place types and amenities 

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
      <button
        className={`${searchParams.get("otherFilters") ? "bg-sky-400" : "bg-sky-200"} flex justify-between items-center`}
        onClick={() => { dialogRef.current?.showModal() }}
      >
        <Image
          src="/icons/filter.png"
          alt="Open other filters"
          width={30}
          height={30}
        />
        <span className="max-sm:hidden text-[16px] lg:text-[18px]">Other filters</span>
      </button>

      <dialog
        ref={dialogRef}
        closedby="any"
        className="absolute w-[90vw] h-[90vh] bg-mauve-200 p-5 lg:left-15 lg:right-15 max-md:left-5 max-md:right-5 top-5 lg:bottom-5 backdrop:backdrop-blur-sm"
      >
        <h1 className="text-[64px] font-bold max-md:text-[50px]">Other Filters</h1>
        <button className="absolute top-10 right-10 p-3 rounded-full" onClick={() => dialogRef.current?.close()}>
          <Image
            src="/icons/close.png"
            alt="Close other filters"
            width={50}
            height={50}
          />
        </button>

        <h2 className="text-[32px]">Restaurant Type</h2>
        <div className="grid lg:grid-cols-5 sm:grid-cols-2 gap-3 capitalize">
          {
            placeChipData.map((data: ChipData) =>
              data.selected ? (
                <Chip
                  key={data.key}
                  label={formatChipLabel(data.label)}
                  onDelete={() => { removeSelectedPlaceTypeChip(data) }}
                  sx={{ bgcolor: "#7dd3fc", fontSize: "large" }}
                />
              ) : (
                <Chip
                  key={data.key}
                  label={formatChipLabel(data.label)}
                  onClick={() => { addSelectedPlaceTypeChip(data) }}
                  sx={{ fontSize: "large" }}
                />
              )
            )
          }
        </div>

        <h2 className="text-[32px]">Rating</h2>
        <div className="lg:w-[50%] max-md:w-[80%] mt-5 ml-5">
          <Slider
            value={rating}
            onChange={(_, newRating: number[]) => { setRating(newRating) }}
            min={1}
            max={5}
            marks={[{ value: 1, label: "1 Star" }, { value: 2, label: "2 Stars" }, { value: 3, label: "3 Stars" }, { value: 4, label: "4 Stars" }, { value: 5, label: "5 Stars" }]}
          />
        </div>

        <h2 className="text-[32px]">Opening Hours (24hr format)</h2>
        <div className="max-md:hidden w-[75%] mt-5 ml-5">
          <Slider
            value={openingHours}
            onChange={(_, newOpeningHours: number[]) => { setOpeningHours(newOpeningHours) }}
            min={0}
            max={23}
            valueLabelDisplay="auto"
            marks={openingHourMarks}
          />
        </div>

        <div className="lg:hidden w-[75%] mt-5 ml-5">
          <Slider
            value={openingHours}
            onChange={(_, newOpeningHours: number[]) => { setOpeningHours(newOpeningHours) }}
            min={0}
            max={23}
            valueLabelDisplay="auto"
          />
        </div>

        <h2 className="text-[32px]">Amenities</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
          <button className="bg-sky-200 text-[32px] px-20 py-5" onClick={submitFilters}>
            Apply
          </button>
        </div>
      </dialog>
    </>
  );

  function submitFilters() {
    const selectedPlaceTypes: PlaceType[] = placeChipData
      .filter((chip: ChipData) => chip.selected)
      .map(chip => {
        return {
          typeid: chip.key,
          name: chip.label
        }
      });

    const otherFilters: OtherFiltersType = {
      rating,
      openingHours,
      amenities: amenityChipData.filter(chip => chip.selected).map(place => place.label)
    };

    searchParams.set("placeTypes", JSON.stringify(selectedPlaceTypes));
    searchParams.set("otherFilters", JSON.stringify(otherFilters));
    dialogRef.current?.close();

    replace(`${pathname}?${searchParams.toString()}`);
  }
}

// Data for the amenity chips from the Google Maps API
const baseAmenityChipData = [
  { key: 0, label: "Accepts Card", selected: false },
  { key: 1, label: "Accepts Cash", selected: false },
  { key: 2, label: "Vegetarian", selected: false },
  { key: 3, label: "Takeout", selected: false },
  { key: 4, label: "Accessible", selected: false },
  { key: 5, label: "Delivers", selected: false },
  { key: 6, label: "Outdoor Seating", selected: false }
];