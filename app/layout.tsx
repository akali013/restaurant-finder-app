import "@/app/globals.css";
import { rubik } from "@/app/ui/fonts";
import QueryProvider from "./QueryProvider";

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
