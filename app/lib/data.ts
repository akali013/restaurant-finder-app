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
  password: string;
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
  isaccessible: boolean;
  hasdelivery: boolean;
  hasoutdoorseating: boolean;
  acceptscard: boolean;
  acceptscash: boolean;
  hasvegetarian: boolean;
  hastakeout: boolean;
  minrating: number;
  isinexpensive: boolean;
  ismoderate: boolean;
  isexpensive: boolean;
  isveryexpensive: boolean;
  starthour: number;
  endhour: number;
};

export type FavoriteRestaurant = {
  userid: string;
  restaurantid: string;
};

export type PreferencePlaceType = {
  preferenceid: string;
  placetypeid: number;
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

export interface ChipData {
  key: number;
  label: string;
  selected: boolean;
};

export type PopupMessageState = {
  error?: string,
  message?: string,
  popupKey?: number     // This allows each popup to be shown even if they have the same message
};

// Marks and labels for the opening hours slider
export const openingHourMarks = [
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
