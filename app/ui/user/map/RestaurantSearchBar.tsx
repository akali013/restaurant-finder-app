"use client";

import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { SubmitEventHandler, useState } from "react";

export default function RestaurantSearchBar() {
  const searchParams = new URLSearchParams(useSearchParams());
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  return (
    <form className="flex items-center bg-mauve-200 rounded-4xl py-2 w-full" onSubmit={submitQuery}>
      <label htmlFor="restaurant-search-bar" className="sr-only">
        Search restaurants
      </label>
      <input
        id="restaurant-search-bar"
        name="restaurant-search-bar"
        className="bg-transparent rounded-4xl focus:outline-2 text-2xl w-full py-2 px-10"
        placeholder="Search restaurants..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button className="bg-transparent" type="submit">
        <Image
          src="/icons/search.png"
          alt="Search for restaurants"
          width={45}
          height={45}
        />
      </button>
    </form>
  );

  function submitQuery(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // Delete the search parameter if no query is submitted
    if (query) {
      searchParams.set("query", query);
    }
    else {
      searchParams.delete("query");
    }

    replace(`${pathname}?${searchParams.toString()}`);
  }
}