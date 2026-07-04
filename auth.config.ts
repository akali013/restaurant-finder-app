import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/"
  },
  callbacks: {
    // Guard protected routes by checking if the user is logged in
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnMap = nextUrl.pathname.startsWith("/map");

      if (isOnMap) {
        if (isLoggedIn) return true;
        return false;     // Redirect unauthenticated users to the login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/map", nextUrl));
      }
      return true;
    },
  },
  providers: []
} satisfies NextAuthConfig;