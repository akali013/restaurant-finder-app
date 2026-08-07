"use client";

import Image from "next/image";

// Error page for when the Google map fails to load
export default function MapErrorPage({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/icons/error.png"
        alt={`${error}`}
        width={50}
        height={50}
      />
      <p>Map cannot be loaded at this time. Please allow location services or try again later.</p>
      <button className="bg-sky-300">
        Try again
      </button>
    </div>
  );
}