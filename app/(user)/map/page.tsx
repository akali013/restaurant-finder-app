import MapInfoWrapper from "@/app/ui/user/map/MapInfoWrapper";
import { GooglePriceLevel, ListFilterType } from "../../lib/data";
import { Metadata } from "next";

export default async function MapPage(props: {
  searchParams?: Promise<{
    listType?: ListFilterType;
    miles?: string;
    placeTypes?: string;
    priceLevel?: string;
    otherFilters?: string;
    query?: string;
  }>
}) {

  const searchParams = await props.searchParams;

  const listType = searchParams?.listType ?? "All";

  // Server side filters supported by Maps APIs
  const miles = Number(searchParams?.miles) || 0;    // Search radius in miles for distance filter
  const placeTypes = JSON.parse(searchParams?.placeTypes || "[]") || [];      // Place types in the other filters
  const query = searchParams?.query || "";

  // Client side filters
  const priceLevel: GooglePriceLevel | "" = searchParams?.priceLevel as GooglePriceLevel || "";
  const otherFilters = JSON.parse(searchParams?.otherFilters || "{}");

  return (
    <div className="flex bg-mauve-300">
      <MapInfoWrapper
        query={query}
        listType={listType}
        miles={miles}
        placeTypes={placeTypes}
        priceLevel={priceLevel}
        otherFilters={otherFilters}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Restaurant Map"
};