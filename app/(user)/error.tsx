"use client";

import Image from "next/image";


// Generic error page for all user routes when an unhandled error happens
export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/icons/error.png"
        alt="Refresh page"
        width={50}
        height={50}
      />
      <p className="mt-5 text-3xl">Something went wrong.</p>
      <button
        className="mt-20 rounded-md bg-sky-300 text-md px-4 py-2 transition-colors hover:bg-sky-400"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}