import "next-auth";
import "next-auth/jwt";

// Custom type definitions for the auth logic to allow user and admin roles
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: "user" | "admin";
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: "user" | "admin";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    email: string;
    role: "user" | "admin";
  }
}