import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/"         // Identify the landing page as the login page
  },
  callbacks: {
    // Guard protected routes by checking if the user is logged in
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;

      // Allow unauthenticated users to create an account
      if (nextUrl.pathname.startsWith("/signup") && !isLoggedIn) return true;

      // Take unauthenticated users back to the login page
      if (!isLoggedIn) return false;

      if (nextUrl.pathname === "/") {
        if (role === "admin") return Response.redirect(new URL("/users", nextUrl));
        if (role === "user") return Response.redirect(new URL("/map", nextUrl));
      }

      // Admins and users have their own set of pages they can access
      const isAdminRoute = nextUrl.pathname.startsWith("/users") || nextUrl.pathname.startsWith("/adminSettings");
      const isUserRoute = nextUrl.pathname.startsWith('/map')
        || nextUrl.pathname.startsWith("/saved")
        || nextUrl.pathname.startsWith("/settings");

      if (role === "admin" && isAdminRoute) return true;
      if (role === "user" && isUserRoute) return true;

      // Restrict roles to their designated pages
      if (role === "admin") return Response.redirect(new URL("/users", nextUrl));
      if (role === "user") return Response.redirect(new URL("/map", nextUrl));


      return false;
    },
  },
  providers: []
} satisfies NextAuthConfig;