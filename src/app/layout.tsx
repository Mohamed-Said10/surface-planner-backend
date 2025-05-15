import { Geist as GeistSans, Geist_Mono as GeistMono } from "next/font/google";

const geistSans = GeistSans({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = GeistMono({ subsets: ["latin"], variable: "--font-geist-mono" });
import SessionProviderWrapper from "../../src/app/sessionproviderwrapper"; // Import the wrapper
import "./globals.css";
import { ReactNode } from "react";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <SessionProviderWrapper>{children}</SessionProviderWrapper> {/* Wrap children */}
      </body>
    </html>
  );
}