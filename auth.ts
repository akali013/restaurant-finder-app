import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/app/lib/data";
import bcrypt from "bcryptjs";

// async function getUserFromEmail(email: string): Promise<User | undefined> {
//   try {
    
//   }
//   catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

// Export auth, signIn, and signOut so bcryptjs can compare passwords
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    // Sign in logic with email and password
    async authorize(credentials) {
      const {email, password} = credentials;
      // const user = await getUserFromEmail(email);
      // if (!user) return null;
      // const passwordsMatch = await bcrypt.compare(password, user.password);
      // if (passwordsMatch) return user;

      console.log("Invalid credentials");
      return null;
    }
  })],
});