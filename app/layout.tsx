import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "LoanDesk - Loan Management System",
  description: "Loan Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
