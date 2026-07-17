"use server";
// Server actions for the app

import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { redirect } from "next/navigation";
import { NearbySearchResponsePlace, PlaceType, Restaurant } from "@/app/lib/data";

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

// Saves the specified place under the current user
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
    return "Database Error: Cannot save restaurant.";
  }
}

// Inserts only new restaurants into the db so they can be referenced by the FavoriteRestaurants table
export async function insertRestaurant(place: NearbySearchResponsePlace) {
  try {
    await sql`
      INSERT INTO Restaurants (restaurantId, name, address, phoneNumber)
      VALUES (${place.id}, ${place.displayName.text}, ${place.formattedAddress}, ${place.nationalPhoneNumber ?? ""})
      ON CONFLICT DO NOTHING
    `;
  }
  catch (error) {
    console.error(error);
    return "Database Error: Cannot insert restaurant.";
  }
}

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