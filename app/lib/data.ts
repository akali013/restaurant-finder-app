// All the database and API types are defined here
export type User = {
  id: string;
  email: string;
  password: string;
  isBanned: boolean;
};

export type Admin = {
  id: string;
  email: string;
};

export type Restaurant = {
  id: string;
  googlePlaceId: string;
};

export type PlaceType = {
  id: string;
  name: string;
};

export type Preference = {
  id: string;
  address: string;
  isAccessible: boolean;
  hasDelivery: boolean;
  hasKidsMenu: boolean;
  openingHours: string[];
  hasOutdoorSeating: boolean;
  priceLevel: string;
  acceptsCard: boolean;
  acceptsCash: boolean;
  rating: string;
  hasVegetarian: boolean;
  hasTakeout: boolean;
};