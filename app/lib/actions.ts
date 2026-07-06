"use server";
// Server actions for the app

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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
    await signIn("credentials", formData);
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