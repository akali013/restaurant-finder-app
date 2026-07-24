"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { getPlaceTypes } from "@/app/lib/actions";
import { PlaceType } from "@/app/lib/data";
import { ChipData } from "@/app/ui/user/map/OtherFilters";

// Retrieve place types from the postgres db
export function usePlaceTypes(setPlaceChipData: Dispatch<SetStateAction<ChipData[]>>) {
  useEffect(() => {
    let ignore = false;
    async function retrievePlaceTypes() {
      const placeTypes = await getPlaceTypes();
      setPlaceChipData(placeTypes.map((placeType: PlaceType) => {
        return {
          key: placeType.typeid,
          label: placeType.name,
          selected: false
        };
      }));
    }

    if (!ignore) retrievePlaceTypes();
    return () => {
      ignore = true;
    }
  }, [setPlaceChipData]);
}