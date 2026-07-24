import { insertRestaurant } from "@/app/lib/actions";
import { MapsAPIResponse, GooglePlace } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Route for an API call to the Nearby Search API using server filters
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  // Filter by user's location
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // Search radius in meters
  const radius = Math.round(Number(searchParams.get("radius")) * 10) / 10 || 16000;
  // Filter by place types
  const primaryTypes = searchParams.get("primaryTypes")?.split(",");

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchNearby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask": "places.accessibilityOptions,places.delivery,places.displayName,places.formattedAddress,places.googleMapsUri,places.iconMaskBaseUri,places.iconBackgroundColor,places.location,places.currentOpeningHours,places.outdoorSeating,places.paymentOptions,places.nationalPhoneNumber,places.id,places.priceLevel,places.primaryType,places.rating,places.servesVegetarianFood,places.takeout,places.websiteUri"
      },
      body: JSON.stringify({
        includedPrimaryTypes: primaryTypes || ["restaurant"],
        locationRestriction: {
          circle: {
            center: {
              latitude: Number(lat),
              longitude: Number(lng)
            },
            radius
          }
        },
        rankPreference: "DISTANCE"
      })
    }
  );


  if (!response.ok) {
    console.error(await response.text());
    return NextResponse.json({
      error: "Nearby Search API request failed",
      status: response.status
    });
  }

  const placesJSON = await response.json() as MapsAPIResponse;

  if (placesJSON.places) {
    // Update the database with any new restaurants that haven't been retrieved yet  
    await Promise.all(
      placesJSON.places.map((place: GooglePlace) => {
        insertRestaurant(place);
      })
    );
  }

  return NextResponse.json(placesJSON);
}
