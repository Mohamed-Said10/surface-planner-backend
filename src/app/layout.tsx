import { Geist, Geist_Mono } from "next/font/google";
import SessionProviderWrapper from "../../src/app/sessionproviderwrapper"; // Import the wrapper
import "./globals.css";
import { ReactNode } from "react";

const geistSans = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

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