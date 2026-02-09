import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RENT.PERMABAN.CZ",
  description: "Rezervace vozidel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}