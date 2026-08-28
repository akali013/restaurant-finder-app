import { GooglePlace } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Route for an API call to get the details of a Google Place via its id
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const placeId = searchParams.get("placeId");
  const placeJSON = getPlaceDetails(placeId);

  return NextResponse.json(placeJSON);
}

export async function getPlaceDetails(placeId: string | null) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask": "accessibilityOptions,delivery,displayName,formattedAddress,googleMapsUri,iconMaskBaseUri,iconBackgroundColor,location,currentOpeningHours,outdoorSeating,paymentOptions,nationalPhoneNumber,id,priceLevel,primaryType,rating,servesVegetarianFood,takeout,websiteUri"
      },
    }
  );

  if (!response.ok) {
    console.error(await response.text());
    console.error({
      error: "Place Details API request failed",
      status: response.status
    });
  }

  const placeJSON = await response.json() as GooglePlace;
  return placeJSON;
}