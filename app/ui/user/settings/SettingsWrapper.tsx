import { getCredentials, getPlaceTypes, getPreferenceInfo } from "@/app/lib/actions";
import CredentialsPreferencesWrapper from "./CredentialsPreferencesWrapper";

export default async function SettingsWrapper() {
  const [email, placeTypes, { preference, preferencePlaceTypes }] = await Promise.all([
    getCredentials(),
    getPlaceTypes(),
    getPreferenceInfo()
  ]);

  return (
    <CredentialsPreferencesWrapper
      email={email}
      placeTypes={placeTypes}
      preference={preference}
      preferencePlaceTypes={preferencePlaceTypes}
    />
  );
}