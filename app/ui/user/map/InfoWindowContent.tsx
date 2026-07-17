import { NearbySearchResponsePlace } from "@/app/lib/data";
import { getFormattedType } from "@/app/lib/placeFormatting";
import Link from "next/link";

// Displays a small info window when a pin on the map is clicked
export default function InfoWindowContent({ place }: { place: NearbySearchResponsePlace }) {

  return (
    <div className="flex flex-col text-[16px] justify-center">
      <h1 className="text-2xl font-bold">{place.displayName.text}</h1>
      <h2 className="text-xl font-medium mt-1 capitalize">{getFormattedType(place)}</h2>
      <h2 className="mt-3">{place.formattedAddress}</h2>
      <h2 className="mt-3">{place.nationalPhoneNumber}</h2>
      <Link href={place.googleMapsUri!} target="_blank" className="text-sky-500 mt-3">View on Google Maps</Link>
    </div>
  );
}