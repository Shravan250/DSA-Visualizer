import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter, Raleway, Young_Serif } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-young-serif",
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlgoArt",
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
      suppressHydrationWarning
    >
      <body className="font-raleway">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
