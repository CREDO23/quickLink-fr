import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";


export const metadata: Metadata = {
  title: "QuickLink",
  description: "URL Shoortener App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>{children}</Providers>
    </html>
  );
}
