"use client";

import { useState } from "react";
import CredentialsForm from "./CredentialsForm";
import PreferencesSection from "./PreferencesSection";
import { PlaceType, Preference } from "@/app/lib/data";

export default function CredentialsPreferencesWrapper({ email, placeTypes, preference, preferencePlaceTypes }: {
  email: string,
  placeTypes: PlaceType[],
  preference?: Preference,
  preferencePlaceTypes?: PlaceType[]
}) {
  const [currentPage, setCurrentPage] = useState<"Credentials" | "Preferences">("Credentials");

  return (
    <>
      <div className="flex items-center justify-between w-110">
        <button
          className={`rounded-lg border border-mauve-300 ${currentPage === "Credentials" ? "bg-mauve-300" : "bg-transparent"}`}
          onClick={() => setCurrentPage("Credentials")}
        >
          Credentials
        </button>

        <button
          className={`rounded-lg border border-mauve-300 ${currentPage === "Preferences" ? "bg-mauve-300" : "bg-transparent"}`}
          onClick={() => setCurrentPage("Preferences")}
        >
          Preferences
        </button>
      </div>

      {
        currentPage === "Credentials" ? (
          <CredentialsForm email={email} />
        ) : (
          <PreferencesSection placeTypes={placeTypes} preference={preference} preferencePlaceTypes={preferencePlaceTypes} />
        )
      }
    </>
  );
}