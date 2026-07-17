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
  callbacks: {
    // Save the user's id in the session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;     // Access user id from JWT
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Get the user's id from the database
        const row = await sql<User[]>`
          SELECT userId FROM Users
          WHERE email=${user.email!}
        `;

        // Save that user id into a jwt token to be accessed anywhere in the app from the current session
        token.userId = row[0].userid;
      }


      return token;
    }
  }
});