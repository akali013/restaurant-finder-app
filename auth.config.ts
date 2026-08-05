import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/"         // Identify the landing page as the login page
  },
  callbacks: {
    // Guard protected routes by checking if the user is logged in
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Redirect unauthenticated users to the login page if they're not logged in
      const isOnMap = nextUrl.pathname.startsWith('/map');
      const isOnSaved = nextUrl.pathname.startsWith("/saved");
      const isOnSettings = nextUrl.pathname.startsWith("/settings");

      if (isOnMap || isOnSaved || isOnSettings) {
        if (isLoggedIn) return true;    // Take authenticated users to their desired page
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/map', nextUrl));   // Take user to the map page by default
      }
      return true;
    },
  },
  providers: []
} satisfies NextAuthConfig;