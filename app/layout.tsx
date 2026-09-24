import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
//import Cart from "./cart/page";
import { CartProvider } from "@/context/CartContext";

const heading = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "The Everything Store",
  description: "A shopping destination for everything you need",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />

          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
