"use server";
// Server actions for the app

import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { redirect } from "next/navigation";
import { GooglePlace, PlaceType, Preference, Restaurant, User } from "@/app/lib/data";
import { revalidatePath } from "next/cache";

// Initialize postgres db
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Form schema for type validation via zod
const CreateAccountFormSchema = z.object({
  id: z.string(),
  email: z.email({
    error: "A valid email is required."
  }),
  password: z.string(),
  retypePassword: z.string(),
  isBanned: z.boolean()
});

const CreateAccountSchema = CreateAccountFormSchema.omit({ id: true, isBanned: true });
const ChangeCredentialsSchema = CreateAccountFormSchema.omit({ id: true, retypePassword: true, isBanned: true });

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);    // Sign in with email and password credentials
  }
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
}

export async function createAccount(prevState: string | undefined, formData: FormData) {
  // Validate signup form values
  const validatedFields = CreateAccountSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    retypePassword: formData.get("retypePassword")
  });

  if (!validatedFields.success) {
    const emailError = z.treeifyError(validatedFields.error).properties?.email?.errors[0];

    if (emailError) {
      return emailError;
    }

    return "All fields are required.";
  }

  const { email, password, retypePassword } = validatedFields.data;

  if (password.length < 8) return "Your password must be at least 8 characters long.";
  if (password !== retypePassword) return "Your passwords do not match.";

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await sql`
    INSERT INTO Users (email, password, isBanned)
    VALUES (${email}, ${hashedPassword}, false);
  `;
  }
  catch (error) {
    console.error(error);
    return "Database error: Failed to create account.";
  }

  // Take the user back to the login page
  redirect("/");
}

// Saves the specified place under the current user and returns its details from the Places API
export async function saveRestaurant(placeId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    await sql`
      INSERT INTO FavoriteRestaurants (userId, restaurantId)
      VALUES (${userId}, ${placeId})
    `;
  }
  catch (error) {
    console.error(error);
    console.log("Database Error: Cannot save restaurant.");
  }
}

// Removes a saved restaurant for the current user
export async function unsaveRestaurant(placeId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    await sql`
      DELETE FROM FavoriteRestaurants
      WHERE userid = ${userId} AND restaurantid = ${placeId}
    `;
  } catch (error) {
    console.error(error);
    console.error("Database Error: Failed to unsave restaurant.");
  }
}

// Inserts only new restaurants into the db so they can be referenced by the FavoriteRestaurants table
export async function insertRestaurant(place: GooglePlace) {
  try {
    await sql`
      INSERT INTO Restaurants (restaurantId, name, address, phoneNumber)
      VALUES (${place.id}, ${place.displayName.text}, ${place.formattedAddress}, ${place.nationalPhoneNumber ?? ""})
      ON CONFLICT DO NOTHING
    `;
  }
  catch (error) {
    console.error(error);
    console.error("Database Error: Cannot insert restaurant.");
  }
}

// Gets the primary place types of the Google Maps API from the postgres db
export async function getPlaceTypes() {
  try {
    const placeTypes: PlaceType[] = await sql<PlaceType[]>`
      SELECT * FROM PlaceTypes;
    `;

    return placeTypes;
  }
  catch (error) {
    console.error(error);
    return [];
  }
}

// Gets the ids of the saved restuarants for the currently logged in user
export async function getSavedRestaurantIds() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const savedIds = await sql`
      SELECT r.restaurantid FROM Restaurants r
      INNER JOIN FavoriteRestaurants f
      ON f.userid = ${userId} AND r.restaurantid = f.restaurantid;
    `;

    return savedIds as unknown as { restaurantid: string }[];
  }
  catch (error) {
    console.error("Database Error: Failed to get saved restaurants.");
    console.error(error);
    return [];
  }
}

// Gets the current user's email
export async function getCredentials(): Promise<string> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const email = await sql`
      SELECT email FROM Users
      WHERE userId=${userId}
    `;

    return email[0].email.toString();
  }
  catch (error) {
    console.error(error);
    console.error("Database Error: Failed to get email.");
    return "";
  }
}

// Changes the current user's email and password 
export async function changeCredentials(formData: FormData) {
  const { email, password } = ChangeCredentialsSchema.parse({
    email: formData.get("settings-email"),
    password: formData.get("settings-password")
  });

  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await sql`
      UPDATE Users
      SET email=${email}, password=${hashedPassword}
      WHERE userId=${userId}
    `;
  }
  catch (error) {
    console.error(error);
    console.error("Database Error: Failed to update credentials");
  }

  revalidatePath("/settings");
  redirect("/settings");
}

// Find the user with the entered email from the login page
export async function getUserFromEmail(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM Users WHERE email=${email}`;
    return user[0];
  }
  catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// Gets the preference for the current user in the postgres db
export async function getPreferenceInfo(): Promise<{ preference?: Preference, preferencePlaceTypes?: PlaceType[] }> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const preference = await sql`
      SELECT * FROM Preferences
      WHERE userid = ${userId};
    `;

    const placeTypes = await sql`
      SELECT typeid, name FROM PlaceTypes p
      INNER JOIN PreferencesPlaceTypes ppt 
      ON ppt.placetypeid = p.typeid AND ppt.preferenceid = ${preference[0].preferenceid}
    `;

    return { preference: preference[0] as Preference, preferencePlaceTypes: placeTypes as unknown as PlaceType[] };
  }
  catch (error) {
    console.error("Database Error: Failed to get preference.");
    console.error(error);
    return {};
  }
}

// Updates the preference for a user in the postgres db
export async function updatePreference(preference: Preference, placeTypeIds: number[]) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    // Upsert the user's preference into the Preferences table so a preferenceid is generated by the postgres db
    const preferenceId = await sql`
      INSERT INTO Preferences (
        isaccessible,
        hasdelivery,
        hasoutdoorseating,
        acceptscard,
        acceptscash,
        hasvegetarian,
        hastakeout,
        minRating,
        isInexpensive,
        isModerate,
        isExpensive,
        isVeryExpensive,
        startHour,
        endHour,
        userid
      )
      VALUES (
        ${preference.isaccessible},
        ${preference.hasdelivery},
        ${preference.hasoutdoorseating},
        ${preference.acceptscard},
        ${preference.acceptscash},
        ${preference.hasvegetarian},
        ${preference.hastakeout},
        ${preference.minrating},
        ${preference.isinexpensive},
        ${preference.ismoderate},
        ${preference.isexpensive},
        ${preference.isveryexpensive},
        ${preference.starthour},
        ${preference.endhour},
        ${userId}
      )
      ON CONFLICT (userid)
      DO UPDATE SET
        isaccessible = EXCLUDED.isaccessible,
        hasdelivery = EXCLUDED.hasdelivery,
        hasoutdoorseating = EXCLUDED.hasoutdoorseating,
        acceptscard = EXCLUDED.acceptscard,
        acceptscash = EXCLUDED.acceptscash,
        hasvegetarian = EXCLUDED.hasvegetarian,
        hastakeout = EXCLUDED.hastakeout,
        minRating = EXCLUDED.minRating,
        isInexpensive = EXCLUDED.isInexpensive,
        isModerate = EXCLUDED.isModerate,
        isExpensive = EXCLUDED.isExpensive,
        isVeryExpensive = EXCLUDED.isVeryExpensive,
        startHour = EXCLUDED.startHour,
        endHour = EXCLUDED.endHour,
        userid = EXCLUDED.userid
      RETURNING preferenceid;
    `;

    console.log(preferenceId);

    // Clear any existing place types in the user's preference to account for deselected place types
    await sql`
      DELETE FROM PreferencesPlaceTypes
      WHERE preferenceid=${preferenceId[0].preferenceid}
    `;

    // Then add the user's preference and any selected place types into the PreferencesPlaceTypes table
    await Promise.all(
      placeTypeIds.map(async (id) => {
        await sql`
        INSERT INTO PreferencesPlaceTypes (preferenceid, placetypeid)
        VALUES (${preferenceId[0].preferenceid}, ${id})
      `;
      })
    );
  }
  catch (error) {
    console.error("Database Error: Failed to update preference.");
    console.error(error);
  }
}