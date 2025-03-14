import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@organisms/Header";
import Footer from "@components/organisms/Footer";
import { Toaster } from "@components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Custom CSS variable
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lingo Bloom",
  description: "Start learning a new language today",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans`}
      >
        <Header />
        <main>{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
