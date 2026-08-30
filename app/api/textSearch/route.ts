import { insertRestaurant } from "@/app/lib/actions";
import { MapsAPIResponse, GooglePlace, processAPIPlaces } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";


// Route for the Google Maps Text Search API
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  // Filters parameters supported by Google Maps Text Search API
  const textQuery = searchParams.get("query");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  const radius = searchParams.get("radius");

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask": "places.accessibilityOptions,places.delivery,places.displayName,places.formattedAddress,places.googleMapsUri,places.iconMaskBaseUri,places.iconBackgroundColor,places.location,places.currentOpeningHours,places.outdoorSeating,places.paymentOptions,places.nationalPhoneNumber,places.id,places.priceLevel,places.primaryType,places.rating,places.servesVegetarianFood,places.takeout,places.websiteUri"
      },
      body: JSON.stringify({
        textQuery,
        locationBias: {
          circle: {
            center: {
              latitude,
              longitude
            },
            radius
          }
        },
        pageSize: 20,
        includePureServiceAreaBusinesses: true
      })
    }
  )

  if (!response.ok) {
    console.error(await response.text());
    return NextResponse.json({
      error: "Text Search API request failed",
      status: response.status
    });
  }

  const placesJSON = await response.json() as MapsAPIResponse;
  let googlePlaces = await processAPIPlaces(placesJSON.places);

  return NextResponse.json({ places: googlePlaces });
}