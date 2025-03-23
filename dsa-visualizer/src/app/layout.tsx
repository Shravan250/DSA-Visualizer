import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway, Young_Serif } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const raleway = Raleway({
  variable: "--font-raleway",
  weight: "600",
  subsets: ["latin"],
});

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "ALgoArt",
  description: "DSA Visualizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${youngSerif.variable} antialiased`}
    >
      <body className="font-raleway">{children}</body>
    </html>
  );
}
