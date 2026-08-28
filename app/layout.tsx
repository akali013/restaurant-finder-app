import "@/app/globals.css";
import { rubik } from "@/app/ui/fonts";
import QueryProvider from "./QueryProvider";
import { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.className} h-full antialiased`}
    >
      {/* For responsive design */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: "%s | Good Eats",
    default: "Good Eats"
  },
  description: "Find all the best restaurants near you catered to your tastes!",
  applicationName: "Good Eats",
  keywords: ["Restaurants", "Food", "Map"],
  openGraph: {
    title: "Good Eats",
    description: "Find all the best restaurants near you catered to your tastes!",
    siteName: "Good Eats",
    type: "website"
  },
};