import SettingsWrapper from "@/app/ui/user/settings/SettingsWrapper";
import { Suspense } from "react";
import SettingsLoadingPage from "./loading";

export default async function SettingsPage() {

  return (
    <div className="px-5 pb-10">
      <h1 className="font-extrabold text-[80px] max-md:text-[50px] max-md:text-center">
        Settings
      </h1>

      <Suspense fallback={<SettingsLoadingPage />}>
        <SettingsWrapper />
      </Suspense>
    </div>
  );
}