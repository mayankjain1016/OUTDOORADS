import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Premium OOH | Elevate Your Brand Nationwide",
  description: "Discover premium outdoor advertising locations across the country. From billboards to transit media, we offer the best OOH inventory.",
  openGraph: {
    title: "Premium OOH Advertising",
    description: "Discover premium outdoor advertising locations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium OOH Advertising",
    description: "Discover premium outdoor advertising locations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-primary-foreground text-primary min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
