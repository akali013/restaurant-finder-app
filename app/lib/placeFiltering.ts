import { Dispatch, SetStateAction } from "react";
import { GooglePlace, GooglePriceLevel, OtherFiltersType, PlaceType, Preference } from "./data";

// Applies the client side filters from the RestaurantHeader (price and otherFilters)
export function applyFilters(
  priceLevel: GooglePriceLevel | "",
  otherFilters: OtherFiltersType,
  originalLocations: GooglePlace[],
  placeTypes?: PlaceType[]
): GooglePlace[] {
  let filteredLocations = [];

  // Allows the user to filter places by price level
  switch (priceLevel) {
    case "PRICE_LEVEL_INEXPENSIVE": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_INEXPENSIVE" || place.priceLevel === "PRICE_LEVEL_FREE");
      break;
    }
    case "PRICE_LEVEL_MODERATE": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_MODERATE");
      break;
    }
    case "PRICE_LEVEL_EXPENSIVE": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_EXPENSIVE");
      break;
    }
    case "PRICE_LEVEL_VERY_EXPENSIVE": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_VERY_EXPENSIVE");
      break;
    }
    case "PRICE_LEVEL_UNSPECIFIED": {
      filteredLocations = originalLocations.filter(place => place.priceLevel === "PRICE_LEVEL_UNSPECIFIED" || !place.priceLevel);
      break;
    }
    default: {
      filteredLocations = originalLocations.slice();
      break;
    }
  };

  // Filter by rating range
  if (otherFilters.rating) {
    const minRating = otherFilters.rating[0];
    const maxRating = otherFilters.rating[1];
    filteredLocations = filteredLocations.filter(place => place.rating && place.rating >= minRating && place.rating <= maxRating);
  }

  // Filter by opening hours
  if (otherFilters.openingHours) {
    const startHour = otherFilters.openingHours[0];
    const endHour = otherFilters.openingHours[1];

    filteredLocations = filteredLocations.filter(place => {
      const [placeOpenHour, placeCloseHour] = getCurrentOpeningPeriod(place);

      return place.currentOpeningHours && (startHour <= placeOpenHour && endHour >= placeCloseHour);
    });
  }

  // Filter by amenities
  if (otherFilters.amenities && otherFilters.amenities.length > 0) {
    filteredLocations = filteredLocations.filter(place => {
      let hasAmenities = true;    // Tracks if each place has all amenities

      otherFilters.amenities!.map(amenity => {
        // Only match places that include all amenities
        switch (amenity) {
          case "Accepts Card": {
            if (!place.paymentOptions?.acceptsCreditCards) hasAmenities = false;
            break;
          }
          case "Accepts Cash": {
            if (!place.paymentOptions?.acceptsCashOnly) hasAmenities = false;
            break;
          }
          case "Vegetarian": {
            if (!place.servesVegetarianFood) hasAmenities = false;
            break;
          }
          case "Takeout": {
            if (!place.takeout) hasAmenities = false;
            break;
          }
          case "Accessible": {
            if (!place.accessibilityOptions) hasAmenities = false;
            break;
          }
          case "Delivers": {
            if (!place.delivery) hasAmenities = false;
            break;
          }
          case "Outdoor Seating": {
            if (!place.outdoorSeating) hasAmenities = false;
            break;
          }
          default: {
            throw new Error("Unknown amenity submitted.");
          }
        }
      });

      return hasAmenities;
    });
  }

  // Filter by place types for the Text Search API results
  if (placeTypes && placeTypes.length > 0) {
    const typeNames = placeTypes.map(type => type.name);
    filteredLocations = filteredLocations.filter(place => typeNames.includes(place.primaryType));
  }

  return filteredLocations;
}

// Applies the user's preferences to the retrieved nearby restaurants
export function applyPreference(preference: Preference | undefined, originalLocations: GooglePlace[]): GooglePlace[] {
  if (!preference) return originalLocations;

  let filteredLocations = [];

  // Check each restaurant to ensure it matches every selected preference option
  filteredLocations = originalLocations.filter(location => {
    if (preference.acceptscard) {
      if (location.paymentOptions?.acceptsCashOnly || (
        location.paymentOptions?.acceptsCreditCards === false &&
        location.paymentOptions?.acceptsDebitCards === false &&
        location.paymentOptions?.acceptsNfc === false)
      ) return false;
    }

    if (preference.hasdelivery && location.delivery) {
      if (!location.delivery) return false;
    }

    if (preference.hasoutdoorseating && location.outdoorSeating) {
      if (!location.outdoorSeating) return false;
    }

    if (preference.hastakeout && location.takeout) {
      if (!location.takeout) return false;
    }

    if (preference.hasvegetarian && location.servesVegetarianFood) {
      if (!location.servesVegetarianFood) return false;
    }

    if (preference.isaccessible) {
      if (!location.accessibilityOptions) return false;
    }

    if (location.priceLevel) {
      if (preference.isinexpensive) {
        if (location.priceLevel !== "PRICE_LEVEL_INEXPENSIVE") return false;
      }

      if (preference.ismoderate) {
        if (location.priceLevel !== "PRICE_LEVEL_MODERATE") return false;
      }

      if (preference.isexpensive) {
        if (location.priceLevel !== "PRICE_LEVEL_EXPENSIVE") return false;
      }

      if (preference.isveryexpensive) {
        if (location.priceLevel !== "PRICE_LEVEL_VERY_EXPENSIVE") return false;
      }
    }

    if (preference.minrating && location.rating) {
      if (location.rating < preference.minrating) return false;
    }

    if ((preference.starthour || preference.endhour) && location.currentOpeningHours) {
      const [placeOpenHour, placeCloseHour] = getCurrentOpeningPeriod(location);

      if (!(preference.starthour <= placeOpenHour && preference.endhour >= placeCloseHour)) return false;
    }

    return true;
  });

  return filteredLocations;
}

// Gets the open and closing hours for the current day by searching through the given place's periods
function getCurrentOpeningPeriod(place: GooglePlace) {
  const currentDay = new Date().getDay();

  let placeOpenHour = 0;
  let placeCloseHour = 23;

  // Get the place's opening and closing hours for the current weekday
  if (place.currentOpeningHours && place.currentOpeningHours.periods) {
    place.currentOpeningHours.periods.forEach((period) => {
      if (period.open.day === currentDay) {
        placeOpenHour = period.open.hour;
        placeCloseHour = period.close.hour;
      }
    });
  }

  return [placeOpenHour, placeCloseHour];
};
