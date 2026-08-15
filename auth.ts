import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { Admin, User } from "@/app/lib/data";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getAccountFromEmail } from "./app/lib/actions";

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
          const accountDetails = await getAccountFromEmail(email);
          if (!accountDetails?.account) return null;

          const passwordsMatch = await bcrypt.compare(password, accountDetails.account.password);
          if (!passwordsMatch) return null;

          return {
            id: accountDetails.role === "user" ? (accountDetails.account as User).userid : (accountDetails.account as Admin).adminid,
            email: accountDetails.account.email,
            role: accountDetails.role
          };
        }

        console.log("Invalid credentials");
        return null;
      }
    })],
  callbacks: {
    ...authConfig.callbacks,    // Extend the route protection logic here so it can receive the account's role and id  
    // Use the account returned from authorize() to setup the JWT
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    // Save the user's or admin's id in the session so it can be used throughout the app from the JWT
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;     // Access user id or admin id from JWT
        session.user.role = token.role;
        session.user.email = token.email;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt"
  }
});