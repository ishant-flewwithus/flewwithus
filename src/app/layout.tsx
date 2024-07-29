import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flew With Us",
  description:
    "Flew With Us is a platform that allows users to book flights, hotels, and car rentals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-background"}>
        <main className="text-textheading">{children}</main>
      </body>
    </html>
  );
}
