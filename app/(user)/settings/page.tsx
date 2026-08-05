import SettingsWrapper from "@/app/ui/user/settings/SettingsWrapper";
import { Suspense } from "react";
import SettingsLoadingPage from "./loading";

export default async function SettingsPage() {

  return (
    <div className="px-10 pb-10">
      <h1 className="font-extrabold text-[80px]">
        Settings
      </h1>

      <Suspense fallback={<SettingsLoadingPage />}>
        <SettingsWrapper />
      </Suspense>
    </div>
  );
}