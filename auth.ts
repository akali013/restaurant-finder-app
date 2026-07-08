import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/app/lib/data";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { z } from "zod";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Find the user with the entered email from the login page
async function getUserFromEmail(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM Users WHERE email=${email}`;
    return user[0];
  }
  catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// Export auth, signIn, and signOut so bcryptjs can compare passwords
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // Sign in logic with email and password
      async authorize(credentials) {
        const parsedCredentials = z.object({ email: z.email(), password: z.string().min(8) }).safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserFromEmail(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      }
    })],
});