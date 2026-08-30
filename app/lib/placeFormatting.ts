import { GooglePlace } from "./data";

// Resolves the Google Maps API price levels into user-friendly descriptions
export function getFormattedPrice(place: GooglePlace): string {
  let priceLevel = "";

  switch (place.priceLevel) {
    case ("PRICE_LEVEL_FREE"): { priceLevel = "Free"; break; }
    case ("PRICE_LEVEL_INEXPENSIVE"): { priceLevel = "Low"; break; }
    case ("PRICE_LEVEL_MODERATE"): { priceLevel = "Medium"; break; }
    case ("PRICE_LEVEL_EXPENSIVE"): { priceLevel = "Expensive"; break; }
    case ("PRICE_LEVEL_VERY_EXPENSIVE"): { priceLevel = "Very Expensive"; break; }
    default: { priceLevel = "N/A" }   // If the price level is unspecified
  }

  return priceLevel;
}

// Resolves the Google Maps API place types with more readable names
// Ex: bar_and_grill -> Bar And Grill
export function getFormattedType(place?: GooglePlace): string {
  if (place === undefined) return "No Name Available";

  const formattedType = place.primaryType.replaceAll("_", " ");
  return formattedType;
}

export function convertMilesToMeters(miles: number) {
  return miles * 1609.34;
}

export function formatChipLabel(name: string): string {
  return name.split("_").join(" ");
}