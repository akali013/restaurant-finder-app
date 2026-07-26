import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/"         // Identify the landing page as the login page
  },
  callbacks: {
    // Guard protected routes by checking if the user is logged in
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      return isLoggedIn; // Redirect unauthenticated users to the login page if they're not logged in
    },
  },
  providers: []
} satisfies NextAuthConfig;