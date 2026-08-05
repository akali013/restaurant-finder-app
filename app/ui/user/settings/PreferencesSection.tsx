import { ChipData, GooglePriceLevel, openingHourMarks, PlaceType, Preference } from "@/app/lib/data";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import { formatChipLabel } from "@/app/lib/placeFormatting";
import Slider from "@mui/material/Slider";
import { updatePreference } from "@/app/lib/actions";

export default function PreferencesSection({ placeTypes, preference, preferencePlaceTypes }:
  {
    placeTypes: PlaceType[],
    preference?: Preference,
    preferencePlaceTypes?: PlaceType[]
  }
) {
  const [placeChipData, setPlaceChipData] = useState<ChipData[]>(getInitialPlaceTypeChips());
  const [minRating, setMinRating] = useState<number>(preference?.minrating ?? 1);
  const [openingHours, setOpeningHours] = useState<number[]>(preference !== undefined ? [preference.starthour, preference.endhour] : [0, 23]);
  const [priceLevels, setPriceLevels] = useState<GooglePriceLevel[]>(getInitialPriceLevels());
  const [amenityChipData, setAmenityChipData] = useState<ChipData[]>(getInitialAmenities());

  function removeSelectedPlaceChip(data: ChipData) {
    setPlaceChipData(placeChipData.map(chip => chip.key === data.key ? { ...chip, selected: false } : chip));
  }

  function addSelectedPlaceChip(data: ChipData) {
    setPlaceChipData(placeChipData.map(chip => chip.key === data.key ? { ...chip, selected: true } : chip));
  }

  function removeSelectedAmenityChip(data: ChipData) {
    setAmenityChipData(amenityChipData.map(chip => chip.key === data.key ? { ...chip, selected: false } : chip));
  }

  function addPriceLevel(level: GooglePriceLevel) {
    const copy = priceLevels.slice();
    copy.push(level);
    setPriceLevels(copy);
  }

  function removePriceLevel(level: GooglePriceLevel) {
    setPriceLevels(priceLevels.filter(pl => pl !== level));
  }

  function addSelectedAmenityChip(data: ChipData) {
    setAmenityChipData(amenityChipData.map(chip => chip.key === data.key ? { ...chip, selected: true } : chip));
  }

  return (
    <div>
      <h2 className="font-semibold text-[32px] my-5">Place Types</h2>
      <div className="grid grid-cols-5 gap-3 capitalize">
        {
          placeChipData.map((data) =>
            data.selected ? (
              <Chip
                key={data.key}
                label={formatChipLabel(data.label)}
                onDelete={() => removeSelectedPlaceChip(data)}
                sx={{ bgcolor: "#7dd3fc", fontSize: "large" }}
              />
            ) : (
              <Chip
                key={data.key}
                label={formatChipLabel(data.label)}
                onClick={() => addSelectedPlaceChip(data)}
                sx={{ fontSize: "large" }}
              />
            )
          )
        }
      </div>

      <h2 className="font-semibold text-[32px] my-5">Minimum Rating</h2>
      <div className="mt-5 ml-5">
        <Slider
          getAriaLabel={() => "Select minimum rating"}
          value={minRating}
          onChange={(_, newRating: number) => setMinRating(newRating)}
          min={1}
          max={5}
          marks={[{ value: 1, label: "1 Star" }, { value: 2, label: "2 Stars" }, { value: 3, label: "3 Stars" }, { value: 4, label: "4 Stars" }, { value: 5, label: "5 Stars" }]}
          valueLabelDisplay="auto"
          getAriaValueText={(rating: number) => rating === 1 ? `${rating} star` : `${rating} stars`}
        />
      </div>

      <h2 className="font-semibold text-[32px] my-5">Opening Hours</h2>
      <div className="mt-5 ml-5">
        <Slider
          value={openingHours}
          onChange={(_, newOpeningHours: number[]) => { setOpeningHours(newOpeningHours) }}
          min={0}
          max={23}
          valueLabelDisplay="auto"
          marks={openingHourMarks}
        />
      </div>

      <h2 className="font-semibold text-[32px] my-5">Price Level</h2>
      <div className="flex justify-evenly items-center">
        <button
          className={`${priceLevels.includes("PRICE_LEVEL_INEXPENSIVE") ? "bg-sky-500" : "bg-sky-300"}`}
          onClick={() => { priceLevels.includes("PRICE_LEVEL_INEXPENSIVE") ? removePriceLevel("PRICE_LEVEL_INEXPENSIVE") : addPriceLevel("PRICE_LEVEL_INEXPENSIVE") }}>
          Inexpensive
        </button>
        <button
          className={`${priceLevels.includes("PRICE_LEVEL_MODERATE") ? "bg-sky-500" : "bg-sky-300"}`}
          onClick={() => { priceLevels.includes("PRICE_LEVEL_MODERATE") ? removePriceLevel("PRICE_LEVEL_MODERATE") : addPriceLevel("PRICE_LEVEL_MODERATE") }}>
          Moderate
        </button>
        <button
          className={`${priceLevels.includes("PRICE_LEVEL_EXPENSIVE") ? "bg-sky-500" : "bg-sky-300"}`}
          onClick={() => { priceLevels.includes("PRICE_LEVEL_EXPENSIVE") ? removePriceLevel("PRICE_LEVEL_EXPENSIVE") : addPriceLevel("PRICE_LEVEL_EXPENSIVE") }}>
          Expensive
        </button>
        <button
          className={`${priceLevels.includes("PRICE_LEVEL_VERY_EXPENSIVE") ? "bg-sky-500" : "bg-sky-300"}`}
          onClick={() => { priceLevels.includes("PRICE_LEVEL_VERY_EXPENSIVE") ? removePriceLevel("PRICE_LEVEL_VERY_EXPENSIVE") : addPriceLevel("PRICE_LEVEL_VERY_EXPENSIVE") }}>
          Very Expensive
        </button>
      </div>


      <h2 className="font-semibold text-[32px] my-5">Amenities</h2>
      <div className="grid grid-cols-4 gap-5 capitalize">
        {
          amenityChipData.map((amenityChip) =>
            amenityChip.selected ? (
              <Chip
                key={amenityChip.key}
                label={formatChipLabel(amenityChip.label)}
                onDelete={() => removeSelectedAmenityChip(amenityChip)}
                sx={{ bgcolor: "#7dd3fc", fontSize: "large" }}
              />
            ) : (
              <Chip
                key={amenityChip.key}
                label={formatChipLabel(amenityChip.label)}
                onClick={() => addSelectedAmenityChip(amenityChip)}
                sx={{ fontSize: "large" }}
              />
            )
          )
        }
      </div>

      <div className="flex justify-end items-center mt-10">
        <button className="bg-sky-300" onClick={submitPreference}>
          Save Preferences
        </button>
      </div>
    </div>
  );

  async function submitPreference() {
    const selectedAmenities: string[] = amenityChipData.map(chip => chip.selected ? chip.label : "");
    const selectedPlaceIds: number[] = placeChipData.filter(chip => chip.selected).map(selectedPlace => selectedPlace.key);

    const preference: Preference = {
      preferenceid: "",   // Automatically generated by the database
      isaccessible: selectedAmenities.includes("Accessible"),
      hasdelivery: selectedAmenities.includes("Delivers"),
      hasoutdoorseating: selectedAmenities.includes("Outdoor Seating"),
      acceptscard: selectedAmenities.includes("Accepts Card"),
      acceptscash: selectedAmenities.includes("Accepts Cash"),
      hasvegetarian: selectedAmenities.includes("Vegetarian Options"),
      hastakeout: selectedAmenities.includes("Has Takeout"),
      minrating: minRating,
      isinexpensive: priceLevels.includes("PRICE_LEVEL_INEXPENSIVE"),
      ismoderate: priceLevels.includes("PRICE_LEVEL_MODERATE"),
      isexpensive: priceLevels.includes("PRICE_LEVEL_EXPENSIVE"),
      isveryexpensive: priceLevels.includes("PRICE_LEVEL_VERY_EXPENSIVE"),
      starthour: openingHours[0],
      endhour: openingHours[1]
    };

    await updatePreference(preference, selectedPlaceIds);
  }

  // Use the user's preferred place types to initially mark these types as selected
  function getInitialPlaceTypeChips(): ChipData[] {
    if (!preference || !preferencePlaceTypes) {
      return placeTypes.map<ChipData>(type => { return { key: type.typeid, label: type.name, selected: false } });
    }

    const preferredTypeIds = preferencePlaceTypes?.map(ppt => ppt.typeid);

    return placeTypes.map<ChipData>(type => {
      if (preferredTypeIds.includes(type.typeid)) {
        return { key: type.typeid, label: type.name, selected: true };
      }

      return { key: type.typeid, label: type.name, selected: false };
    });
  }

  // Use the user's preference to load the page with their preferred price levels
  function getInitialPriceLevels() {
    if (!preference) return [];

    const priceLevels: GooglePriceLevel[] = [];

    if (preference.isinexpensive) priceLevels.push("PRICE_LEVEL_INEXPENSIVE");
    if (preference.ismoderate) priceLevels.push("PRICE_LEVEL_MODERATE");
    if (preference.isexpensive) priceLevels.push("PRICE_LEVEL_EXPENSIVE");
    if (preference.isveryexpensive) priceLevels.push("PRICE_LEVEL_VERY_EXPENSIVE");

    return priceLevels;
  }

  // Use the user's preferred amenities to initially mark these amenities as selected
  function getInitialAmenities(): ChipData[] {
    if (!preference) return baseAmenityChipData;

    const preferredAmenities: ChipData[] = [];

    preferredAmenities.push({ key: 0, label: "Accepts Card", selected: preference.acceptscard });
    preferredAmenities.push({ key: 1, label: "Accepts Cash", selected: preference.acceptscash });
    preferredAmenities.push({ key: 2, label: "Vegetarian Options", selected: preference.hasvegetarian });
    preferredAmenities.push({ key: 3, label: "Has Takeout", selected: preference.hastakeout });
    preferredAmenities.push({ key: 4, label: "Accessible", selected: preference.isaccessible });
    preferredAmenities.push({ key: 5, label: "Delivers", selected: preference.hasdelivery });
    preferredAmenities.push({ key: 6, label: "Outdoor Seating", selected: preference.hasoutdoorseating });

    return preferredAmenities;
  }
}


const baseAmenityChipData: ChipData[] = [
  { key: 0, label: "Accepts Card", selected: false },
  { key: 1, label: "Accepts Cash", selected: false },
  { key: 2, label: "Vegetarian Options", selected: false },
  { key: 3, label: "Has Takeout", selected: false },
  { key: 4, label: "Accessible", selected: false },
  { key: 5, label: "Delivers", selected: false },
  { key: 6, label: "Outdoor Seating", selected: false }
];