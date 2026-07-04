import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Initialize NextAuth with config object
export default NextAuth(authConfig).auth;

// Configure a proxy to protect protected routes using the authConfig.ts file
export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};