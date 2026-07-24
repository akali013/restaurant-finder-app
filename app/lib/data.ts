// All the database and API types are defined here
export type User = {
  userid: string;
  email: string;
  password: string;
  isBanned: boolean;
};

export type Admin = {
  adminid: string;
  email: string;
};

export type Restaurant = {
  restaurantid: string;     // The same as the Google Places place id
  name: string;
  address: string;
  phoneNumber: string;
};

export type PlaceType = {
  typeid: number;
  name: string;
};

export type Preference = {
  preferenceid: string;
  address: string;
  isAccessible: boolean;
  hasDelivery: boolean;
  openingHours: string[];
  hasOutdoorSeating: boolean;
  priceLevel: string;
  acceptsCard: boolean;
  acceptsCash: boolean;
  rating: string;
  hasVegetarian: boolean;
  hasTakeout: boolean;
};

export type FavoriteRestaurant = {
  userid: string;
  restaurantid: string;
};

export interface MapsAPIResponse {
  places: GooglePlace[];
};

export interface GooglePlace {
  accessibilityOptions?: {
    "wheelchairAccessibleParking": boolean,
    "wheelchairAccessibleEntrance": boolean,
    "wheelchairAccessibleRestroom": boolean,
    "wheelchairAccessibleSeating": boolean
  };
  delivery?: boolean;
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  googleMapsUri?: string;
  iconBackgroundColor?: string;
  iconMaskBaseUri?: string;
  location: {
    latitude: number,
    longitude: number
  };
  currentOpeningHours?: {
    periods?: Period[];
    weekdayDescriptions?: string[];
    secondaryHoursType?: string;
    specialDay?: { date: GoogleDate };
    nextOpenTime?: string;
    nextCloseTime?: string;
    openNow?: boolean;
  };
  outdoorSeating?: boolean;
  paymentOptions?: {
    "acceptsCreditCards": boolean,
    "acceptsDebitCards": boolean,
    "acceptsCashOnly": boolean,
    "acceptsNfc": boolean
  };
  nationalPhoneNumber?: string;
  id: string;
  priceLevel?: GooglePriceLevel;
  primaryType: string;
  rating?: number;
  servesVegetarianFood?: boolean;
  takeout?: boolean;
  websiteUri?: string;
}

interface Period {
  open: Point;
  close: Point;
};

interface Point {
  date: GoogleDate;
  truncated: boolean;
  day: number;
  hour: number;
  minute: number;
};

interface GoogleDate {
  year: number,
  month: number,
  day: number
};

export type GooglePriceLevel = "PRICE_LEVEL_UNSPECIFIED" | "PRICE_LEVEL_FREE" | "PRICE_LEVEL_INEXPENSIVE" | "PRICE_LEVEL_MODERATE" | "PRICE_LEVEL_EXPENSIVE" | "PRICE_LEVEL_VERY_EXPENSIVE";

export type OtherFiltersType = {
  rating?: number[];
  openingHours?: number[];
  amenities?: string[];
};

export type ListFilterType = "All" | "Saved" | "Recommended";
