import "@/app/globals.css";
import { rubik } from "@/app/ui/fonts";

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
      <body>{children}</body>
    </html>
  );
}
